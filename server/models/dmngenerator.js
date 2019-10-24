"use strict";

const shortid = require('shortid');

module.exports = () => {
    const dmnGenerator = {};

    const mainTpl = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="Definitions_${shortid.generate()}" name="DRD" namespace="http://camunda.org/schema/1.0/dmn" exporter="Camunda Modeler" exporterVersion="3.2.3">
  <decision id="Decision_${shortid.generate()}" name="##tableName##">
    <extensionElements>
      <biodi:bounds x="887" y="59" width="180" height="80" />
    </extensionElements>
    <decisionTable id="decisionTable_${shortid.generate()}">
        ##inputVarsDefinition##
        ##outputVarsDefenition##
        ##rules##
    </decisionTable>
  </decision>
</definitions>`;
    const inputVariableTpl = `
      <input id="input_##inputId##" label="##name##" camunda:inputVariable="##name##">
        <inputExpression id="inputExpression_##exprId##" typeRef="##type##">
          <text></text>
        </inputExpression>
      </input>\n`;
    const outputVariableTpl = `<output id="output_##id##" label="##name##" name="##name##" typeRef="##type##" />\n`;
    const ruleTpl = `<rule id="DecisionRule_##id##">##inputEntries####outputEntries##</rule>\n`;
    const inputEntryTpl = `<inputEntry id="UnaryTests_##id##"><text>##value##</text></inputEntry>\n`;
    const outputEntryTpl = `<outputEntry id="LiteralExpression_##id##"><text>##value##</text></outputEntry>\n`;

    dmnGenerator.generateXML = (table, paramsMetadata, tableName) => {
        let [inputVarsDefinition, outputVarsDefinition] = varsDefinitionReplace(paramsMetadata);

        if (table.length < 1) {
            mainTplReplace(tableName, inputVarsDefinition, outputVarsDefinition, '')
        }

        let rules = rulesReplace(table, paramsMetadata);

        return mainTplReplace(tableName, inputVarsDefinition, outputVarsDefinition, rules);
    };

    const varsDefinitionReplace = (paramsMetadata) => {
        let inputVarsDefinition = '';
        let outputVarsDefinition = '';

        for (let i in paramsMetadata) {
            let variable = paramsMetadata[i];

            if (variable.directionType === 'input') {
                inputVarsDefinition += inputVariableTpl
                    .replace('##inputId##', shortid.generate())
                    .replace('##exprId##', shortid.generate())
                    .replace(/##name##/g, variable.name)
                    .replace('##type##', variable.type);
            } else if (variable.directionType === 'output') {
                outputVarsDefinition += outputVariableTpl
                    .replace('##id##', shortid.generate())
                    .replace(/##name##/g, variable.name)
                    .replace('##type##', variable.type);
            }
        }

        return [inputVarsDefinition, outputVarsDefinition];
    };

    const rulesReplace = (table, paramsMetadata) => {
        let rules = '';

        for (let rowIndex in table) {
            let row = table[rowIndex];
            let inputEntries = '';
            let outputEntries = '';

            for(let varIndex in paramsMetadata) {
                let variableMetadata = paramsMetadata[varIndex];
                let col = row.filter((val) => val.name === variableMetadata.columnName)[0];
                let value = col.value === null ? '' : col.value;

                if (col.directionType === 'input') {
                    inputEntries += inputEntryTpl
                        .replace('##id##', shortid.generate())
                        .replace('##value##', variableMetadata.type == 'string' ? `"${value}"` : value);
                } else if (col.directionType === 'output') {
                    outputEntries += outputEntryTpl
                        .replace('##id##', shortid.generate())
                        .replace('##value##', variableMetadata.type == 'string' ? `"${value}"` : value);
                }
            }

            rules += ruleTpl
                .replace('##id##', shortid.generate())
                .replace('##inputEntries##', inputEntries)
                .replace('##outputEntries##', outputEntries)
        }

        return rules;
    };

    const mainTplReplace = (tableName, inputVarsDefinition, outputVarsDefinition, rules) => {
        return mainTpl
            .replace('##tableName##', tableName)
            .replace('##inputVarsDefinition##', inputVarsDefinition)
            .replace('##outputVarsDefenition##', outputVarsDefinition)
            .replace('##rules##', rules);
    };

    return dmnGenerator;
};