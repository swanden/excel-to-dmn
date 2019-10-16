"use strict";

const exceljs = require('exceljs');

module.exports = () => {
    const excelParser = {};

    excelParser.parseSimpleTable = (fileName, inputParams, outputParams, callback) => {
        inputParams = inputParams.map((val) => val.toUpperCase());
        outputParams = outputParams.map((val) => val.toUpperCase());

        let workbook = new exceljs.Workbook();

        workbook.xlsx.readFile(fileName)
            .then((workbook) => {
                let worksheet = workbook.getWorksheet(1);
                let table = [];

                for (let row = 1; row <= worksheet.rowCount; row++) {
                    // let curRow = {
                    //     A: { value: 'AC', valueType: 'string', variableType: 'input' }
                    // };
                    let curRow = [];

                    for (let inputParamIndex in inputParams) {
                        curRow.push({
                            [inputParams[inputParamIndex]] : {
                                value: worksheet.getRow(row).getCell(inputParams[inputParamIndex]).value,
                                valueType: 'string',
                                variableType: 'input'
                            }
                        });
                    }

                    for (let outputParamIndex in outputParams) {
                        curRow.push({
                            [outputParams[outputParamIndex]] : {
                                value: worksheet.getRow(row).getCell(outputParams[outputParamIndex]).value,
                                valueType: 'string',
                                variableType: 'output'
                            }
                        });
                    }

                    table.push(curRow);
                }

                callback(table);
                // console.log('rowCount: ' + worksheet.rowCount);
                // console.log('columnCount: ' + worksheet.columnCount);
                // console.log(worksheet.getRow(1).getCell('A').value);
            });
    };

    return excelParser;
};