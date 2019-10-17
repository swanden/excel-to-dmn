const express = require('express');
const excelParserFactory = require('./lib/excelparser');
const DMNGeneratorFactory = require('./lib/dmngenerator');

const app = express();
const excelParser = excelParserFactory();
const dmnGenerator = DMNGeneratorFactory();

app.get('/', function(req, res){

    excelParser.parseSimpleTable('data2.xlsx', ['A', 'B'], ['D'], (table) => {
        let variablesMetadata = [
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

        let xml = dmnGenerator.generateXML(table, variablesMetadata, 'Модели');
        let result = {
            result: true,
            xml: xml
        };

        res.json(result);
    });
});

app.listen(3000, function() {
   console.log('Listen to: http://localhost:3000');
});