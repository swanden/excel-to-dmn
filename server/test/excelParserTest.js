'use strict';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const sinon = require('sinon');

const excelParserFactory = require('../models/excelParser');
const exceljs = require('exceljs');

describe('excelParser', () => {
    let excelParser;

    beforeEach(() => {
        excelParser = excelParserFactory(exceljs);
    });

    it('parseSimpleTable', (done) => {
        let testFilePath = `${__dirname}/../examples/simple-table.xlsx`;
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
        let resultTable = [
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

        excelParser.parseSimpleTable(testFilePath, paramsMetadata, (err, table) => {
            if (err) {
                done();
                throw err;
            }
            // table.should.eql(resultTable);
            expect(table).to.deep.equal(resultTable);
            done();
        });
    });

    it('parseIncidenceTable', (done) => {
        let testFilePath = `${__dirname}/../examples/small-incidence-table.xlsx`;
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
                columnName: 'C',
                type: 'double',
                directionType: 'output'
            }
        ];
        let resultTable = [ [ { name: 'A', value: '18', directionType: 'input' },
            { name: 'B', value: '0', directionType: 'input' },
            { name: 'C', value: '1,55', directionType: 'output' } ],
            [ { name: 'A', value: '19', directionType: 'input' },
                { name: 'B', value: '0', directionType: 'input' },
                { name: 'C', value: '1,55', directionType: 'output' } ],
            [ { name: 'A', value: '19', directionType: 'input' },
                { name: 'B', value: '1', directionType: 'input' },
                { name: 'C', value: '1,50', directionType: 'output' } ],
            [ { name: 'A', value: '20', directionType: 'input' },
                { name: 'B', value: '0', directionType: 'input' },
                { name: 'C', value: '1,50', directionType: 'output' } ],
            [ { name: 'A', value: '20', directionType: 'input' },
                { name: 'B', value: '1', directionType: 'input' },
                { name: 'C', value: '1,50', directionType: 'output' } ],
            [ { name: 'A', value: '20', directionType: 'input' },
                { name: 'B', value: '2', directionType: 'input' },
                { name: 'C', value: '1,45', directionType: 'output' } ],
            [ { name: 'A', value: '21', directionType: 'input' },
                { name: 'B', value: '0', directionType: 'input' },
                { name: 'C', value: '1,45', directionType: 'output' } ],
            [ { name: 'A', value: '21', directionType: 'input' },
                { name: 'B', value: '1', directionType: 'input' },
                { name: 'C', value: '1,45', directionType: 'output' } ],
            [ { name: 'A', value: '21', directionType: 'input' },
                { name: 'B', value: '2', directionType: 'input' },
                { name: 'C', value: '1,35', directionType: 'output' } ] ];

        excelParser.parseIncidenceTable(testFilePath, paramsMetadata, (err, table) => {
            if (err) {
                done();
                throw err;
            }

            expect(table).to.deep.equal(resultTable);

            // console.log(table)
            done();
        });
    });
});