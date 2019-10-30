"use strict";

module.exports = (excelParser, dmnGenerator, formidable, fs) => {
    const appController = {};

    appController.getDmnXml = (req, res, tableType, callback) => {
        let form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                return callback(err);
            }

            let oldPath = files.file.path;
            let serverFileName = `${(new Date().getTime())}_${files.file.name}`;
            let newPath = `${__dirname}/../tmp/${serverFileName}`;

            uploadFile(oldPath, newPath, fields, res, tableType, callback);
        });
    };

    const uploadFile = (oldPath, newPath, fields, res, tableType, callback) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                return callback(err);
            }

            let paramsMetadata = JSON.parse(fields.paramsMetadata);
            let tableName = fields.dmnTableName;

            if (tableType === 'simple') {
                parseSimpleTable(newPath, paramsMetadata, tableName, res, callback);
            } else {
                parseIncidenceTable(newPath, paramsMetadata, tableName, res, callback);
            }
        });
    };

    const parseSimpleTable = (newPath, paramsMetadata, tableName, res, callback) => {
        excelParser.parseSimpleTable(newPath, paramsMetadata, (err, table) => {
            fs.unlinkSync(newPath);

            if (err) {
                return callback(err);
            }

            let xml = dmnGenerator.generateXML(table, paramsMetadata, tableName);

            callback(null, xml);
        });
    };

    const parseIncidenceTable = (newPath, paramsMetadata, tableName, res, callback) => {
        excelParser.parseIncidenceTable(newPath, paramsMetadata, (err, table) => {
            fs.unlinkSync(newPath);

            if (err) {
                return callback(err);
            }

            let xml = dmnGenerator.generateXML(table, paramsMetadata, tableName);

            callback(null, xml);
        });
    };

    return appController;
};