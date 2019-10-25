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

                    // for (let inputParamIndex in inputParams) {
                    //     // curRow.push({
                    //     //     [inputParams[inputParamIndex]] : {
                    //     //         name: inputParams[inputParamIndex]
                    //     //         value: worksheet.getRow(row).getCell(inputParams[inputParamIndex]).value,
                    //     //         valueType: 'string',
                    //     //         variableType: 'input'
                    //     //     }
                    //     // });
                    //     curRow.push({
                    //             name: inputParams[inputParamIndex],
                    //             value: worksheet.getRow(row).getCell(inputParams[inputParamIndex]).value,
                    //             // valueType: 'string',
                    //             directionType: 'input'
                    //     });
                    // }
                    //
                    // for (let outputParamIndex in outputParams) {
                    //     // curRow.push({
                    //     //     [outputParams[outputParamIndex]] : {
                    //     //         value: worksheet.getRow(row).getCell(outputParams[outputParamIndex]).value,
                    //     //         valueType: 'string',
                    //     //         variableType: 'output'
                    //     //     }
                    //     // });
                    //     curRow.push({
                    //             name: outputParams[outputParamIndex],
                    //             value: worksheet.getRow(row).getCell(outputParams[outputParamIndex]).value,
                    //             // valueType: 'string',
                    //             directionType: 'output'
                    //     });
                    // }

                    table.push(curRow);
                }

                callback(null, table);
                // console.log('rowCount: ' + worksheet.rowCount);
                // console.log('columnCount: ' + worksheet.columnCount);
                // console.log(worksheet.getRow(1).getCell('A').value);
            })
            .catch(function(err){
                callback(err);
            });
    };

    return excelParser;
};