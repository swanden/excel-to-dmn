const express = require('express');
const excelParserFactory = require('./lib/excelparser');
const XMLGeneratorFactory = require('./lib/xmlgenerator');

const app = express();
const excelParser = excelParserFactory();
const xmlGenerator = XMLGeneratorFactory();

excelParser.parseSimpleTable('data2.xlsx', ['A', 'B'], ['D'], (table) => {
    xmlGenerator.generate(table);
});

// app.get('/', function(req, res){
//     res.send('Excel to DMN application');

    // let workbook = new exceljs.Workbook();
    // workbook.xlsx.readFile('data.xlsx')
    //     .then(function(workbook) {
    //         let worksheet = workbook.getWorksheet(1);
    //         console.log('rowCount: ' + worksheet.rowCount);
    //         console.log('columnCount: ' + worksheet.columnCount);
    //         console.log(worksheet.getRow(1).getCell('A').value);
    //     });
// });

// app.listen(3000, function() {
//    console.log('http://localhost:3000');
// });