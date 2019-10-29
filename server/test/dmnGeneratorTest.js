'use strict';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const sinon = require('sinon');

const dmnGeneratorFactory = require('../models/dmnGenerator');
const shortid = require('shortid');

describe('dmnGenerator', () => {
    let shortidStub,
        dmnGenerator;
    beforeEach(() => {
        shortidStub = sinon.stub(shortid);
        dmnGenerator = dmnGeneratorFactory(shortidStub);
    });

    it('generateXML', (done) => {
        // shortidStub.generate.onCall(0).returns('eWRhpRV');
        shortidStub.generate.returns('eWRhpRV');
        let paramsMetadata = [
            {
                name: 'first',
                columnName: 'A',
                type: 'string',
                directionType: 'input'
            },
            {
                name: 'second',
                columnName: 'B',
                type: 'string',
                directionType: 'input'
            },
            {
                name: 'third',
                columnName: 'D',
                type: 'double',
                directionType: 'output'
            }
        ];
        let tableName = 'Models';
        let table = [
            [
                {name: 'A', value: 'AC', directionType: 'input'},
                {name: 'B', value: 'ACE', directionType: 'input'},
                {name: 'D', value: '1.2', directionType: 'output'}
            ],
            [
                {name: 'A', value: 'AC', directionType: 'input'},
                {name: 'B', value: 'ACECA', directionType: 'input'},
                {name: 'D', value: '1.2', directionType: 'output'}
            ],
            [
                {name: 'A', value: 'AC', directionType: 'input'},
                {name: 'B', value: 'COBRA', directionType: 'input'},
                {name: 'D', value: '1.2', directionType: 'output'}
            ]
        ];

        let resultXml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="Definitions_undefined" name="DRD" namespace="http://camunda.org/schema/1.0/dmn" exporter="Camunda Modeler" exporterVersion="3.2.3">
  <decision id="Decision_undefined" name="Models">
    <extensionElements>
      <biodi:bounds x="887" y="59" width="180" height="80" />
    </extensionElements>
    <decisionTable id="decisionTable_undefined">
        
      <input id="input_eWRhpRV" label="first" camunda:inputVariable="first">
        <inputExpression id="inputExpression_eWRhpRV" typeRef="string">
          <text></text>
        </inputExpression>
      </input>

      <input id="input_eWRhpRV" label="second" camunda:inputVariable="second">
        <inputExpression id="inputExpression_eWRhpRV" typeRef="string">
          <text></text>
        </inputExpression>
      </input>

        <output id="output_eWRhpRV" label="third" name="third" typeRef="double" />

        <rule id="DecisionRule_eWRhpRV"><inputEntry id="UnaryTests_eWRhpRV"><text>"AC"</text></inputEntry>
<inputEntry id="UnaryTests_eWRhpRV"><text>"ACE"</text></inputEntry>
<outputEntry id="LiteralExpression_eWRhpRV"><text>1.2</text></outputEntry>
</rule>
<rule id="DecisionRule_eWRhpRV"><inputEntry id="UnaryTests_eWRhpRV"><text>"AC"</text></inputEntry>
<inputEntry id="UnaryTests_eWRhpRV"><text>"ACECA"</text></inputEntry>
<outputEntry id="LiteralExpression_eWRhpRV"><text>1.2</text></outputEntry>
</rule>
<rule id="DecisionRule_eWRhpRV"><inputEntry id="UnaryTests_eWRhpRV"><text>"AC"</text></inputEntry>
<inputEntry id="UnaryTests_eWRhpRV"><text>"COBRA"</text></inputEntry>
<outputEntry id="LiteralExpression_eWRhpRV"><text>1.2</text></outputEntry>
</rule>

    </decisionTable>
  </decision>
</definitions>`;

        dmnGenerator.generateXML(table, paramsMetadata, tableName).should.equal(resultXml);

        done();
    });
});