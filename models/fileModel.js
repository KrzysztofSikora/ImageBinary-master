/**
 * Created by krzysztof on 10.06.16.
 */
var db = require('../db');

var fileModel = db.model('fileModel', {

    fileData: Buffer,
    mimeType: String,
    fileName: String,
    fileOwner: String,
    desc: String

})


module.exports = fileModel;