"use strict";

module.exports = (excelParser, dmnGenerator, formidable, fs) => {
    const appController = {};

    appController.getDmnXml = (req, res, callback) => {
        let form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                // output.error = err.message;
                // return res.json(output);
                return callback(err);
            }

            let oldPath = files.file.path;
            let serverFileName = `${(new Date().getTime())}_${files.file.name}`;
            let newPath = `${__dirname}/../tmp/${serverFileName}`;

            uploadFile(oldPath, newPath, fields, res, callback);
        });
    };

    const uploadFile = (oldPath, newPath, fields, res, callback) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                // output.error = err.message;
                // return res.json(output);
                return callback(err);
            }

            let paramsMetadata = JSON.parse(fields.paramsMetadata);
            let tableName = fields.dmnTableName;

            parseTable(newPath, paramsMetadata, tableName, res, callback);
        });
    };

    const parseTable = (newPath, paramsMetadata, tableName, res, callback) => {
        excelParser.parseSimpleTable(newPath, paramsMetadata, (err, table) => {
            fs.unlinkSync(newPath);

            if (err) {
                // let msg = 'Error: ' + err.message;
                // console.log(msg);
                // output.error = msg;
                //
                // return res.json(output);
                return callback(err);
            }

            let xml = dmnGenerator.generateXML(table, paramsMetadata, tableName);

            callback(null, xml);
        });
    };

    return appController;
};