/**
 * Created by krzysztof on 05.06.16.
 */

var db = require('../db');

var dataModel = db.model('dataModel', {
    number: { type: String },
    message:{ type: String }
})


module.exports = dataModel;