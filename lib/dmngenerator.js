"use strict";

const shortid = require('shortid');

module.exports = () => {
    const dmnGenerator = {};

    dmnGenerator.generateXML = (table, variablesMetadata) => {
        let mainTpl = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="Definitions_${shortid.generate()}" name="DRD" namespace="http://camunda.org/schema/1.0/dmn" exporter="Camunda Modeler" exporterVersion="3.2.3">
  <decision id="Decision_${shortid.generate()}" name="Decision 1">
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

        let inputVariableTpl = `
      <input id="input_##inputId##" label="##name##" camunda:inputVariable="##name##">
        <inputExpression id="inputExpression_##exprId##" typeRef="##type##">
          <text></text>
        </inputExpression>
      </input>\n`;
        let outputVariableTpl = `<output id="output_##id##" label="##name##" name="##name##" typeRef="##type##" />\n`;

        let ruleTpl = `<rule id="DecisionRule_##id##">##inputEntries####outputEntries##</rule>\n`;
        let inputEntryTpl = `<inputEntry id="UnaryTests_##id##"><text>##value##</text></inputEntry>\n`;
        let outputEntryTpl = `<outputEntry id="LiteralExpression_##id##"><text>##value##</text></outputEntry>\n`;

        let inputVarsDefinition = '';
        let outputVarsDefinition = '';
        for (let i in variablesMetadata) {
            let variable = variablesMetadata[i];

            if (variable.directionType === 'input') {
                inputVarsDefinition += inputVariableTpl
                    .replace('##inputId##', shortid.generate())
                    .replace('##exprId##', shortid.generate())
                    .replace('##name##', variable.name)
                    .replace('##name##', variable.name)
                    .replace('##type##', variable.type);
            } else if (variable.directionType === 'output') {
                outputVarsDefinition += outputVariableTpl
                    .replace('##id##', shortid.generate())
                    .replace('##name##', variable.name)
                    .replace('##name##', variable.name)
                    .replace('##type##', variable.type);
            }
        }

        if (table.length < 1) {
            return mainTpl
                .replace('##inputVarsDefinition##', inputVarsDefinition)
                .replace('##outputVarsDefenition##', outputVarsDefinition)
                .replace('##rules##', '');
        }

        let rules = '';
        for (let rowIndex in table) {
            let row = table[rowIndex];
            let inputRules = '';
            let outputRules = '';

            for(let varIndex in variablesMetadata) {
                let variableMetadata = variablesMetadata[varIndex];
                let col = row.filter((val)=> val.name === variableMetadata.columnName )[0];

                if (col.directionType === 'input') {
                    inputRules += inputEntryTpl
                        .replace('##id##', shortid.generate())
                        .replace('##value##', variableMetadata.type == 'string' ? `"${col.value}"` : col.value);
                } else if (col.directionType === 'output') {
                    outputRules += outputEntryTpl
                        .replace('##id##', shortid.generate())
                        .replace('##value##', variableMetadata.type == 'string' ? `"${col.value}"` : col.value);
                }
            }

            rules += ruleTpl
                .replace('##id##', shortid.generate())
                .replace('##inputEntries##', inputRules)
                .replace('##outputEntries##', outputRules)
        }

        return mainTpl
            .replace('##inputVarsDefinition##', inputVarsDefinition)
            .replace('##outputVarsDefenition##', outputVarsDefinition)
            .replace('##rules##', rules);
    };

    return dmnGenerator;
};