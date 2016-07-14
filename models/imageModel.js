/**
 * Created by krzysztof on 10.06.16.
 */
var db = require('../db');

var imageModel = db.model('imageModel', {

    data: Buffer, contentType: String


})


module.exports = imageModel;