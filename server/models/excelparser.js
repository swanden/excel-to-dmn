"use strict";

module.exports = (exceljs) => {
    const excelParser = {};

    excelParser.parseSimpleTable = (fileName, paramsMetadata, callback) => {
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

                    for (let index in paramsMetadata) {
                        let variable = paramsMetadata[index];
                        curRow.push({
                            name: variable.columnName,
                            value: worksheet.getRow(row).getCell(variable.columnName).value,
                            // valueType: 'string',
                            directionType: variable.directionType
                        });
                    }

                    table.push(curRow);
                }

                callback(null, table);
            })
            .catch(function(err){
                callback(err);
            });
    };

    excelParser.parseIncidenceTable = (fileName, paramsMetadata, callback) => {
        let workbook = new exceljs.Workbook();

        workbook.xlsx.readFile(fileName)
            .then((workbook) => {
                let worksheet = workbook.getWorksheet(1);
                let table = [];

                for (let row = 2; row <= worksheet.rowCount; row++) {
                    // let curRow = {
                    //     A: { value: 'AC', valueType: 'string', variableType: 'input' }
                    // };

                    // let firstInputParam = paramsMetadata[0];
                    // let secondInputParam = paramsMetadata[1];
                    // let outputParam = paramsMetadata[2];

                    // curRow.push({
                    //     name: firstInputParam.columnName,
                    //     value: worksheet.getRow(row).getCell(variable.columnName).value,
                    //     // valueType: 'string',
                    //     directionType: variable.directionType
                    // });

                    worksheet.getRow(row).eachCell((cell, colNumber) => {
                        if (colNumber !== 1) {
                            let curRow = [];

                            curRow.push({
                                name: 'A',
                                value: worksheet.getRow(row).getCell(1).value,
                                directionType: 'input'
                            });
                            curRow.push({
                                name: 'B',
                                value: worksheet.getRow(1).getCell(colNumber).value,
                                directionType: 'input'
                            });
                            curRow.push({
                                name: 'C',
                                value: cell.value,
                                directionType: 'output'
                            });

                            table.push(curRow);
                        }
                    });
                    // for (let index in paramsMetadata) {
                    //     let variable = paramsMetadata[index];
                    //     curRow.push({
                    //         name: variable.columnName,
                    //         value: worksheet.getRow(row).getCell(variable.columnName).value,
                    //         // valueType: 'string',
                    //         directionType: variable.directionType
                    //     });
                    // }

                }

                callback(null, table);
            })
            .catch(function(err){
                callback(err);
            });
    };

    return excelParser;
};