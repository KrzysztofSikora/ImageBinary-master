/**
 * Created by krzysztof on 04.06.16.
 */
/**
 * Created by Lenovo on 2016-06-01.
 */
var express = require("express");
var router = express.Router();
var http = require("http");

var fileModel = require("../models/fileModel"); // model
// Add
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

router.get("/test", function (req, res) {
    console.log("Test")
});


// router.get("/test/:zmienna", function (req, res) {
//
//     var dataGet = {id: req.params.zmienna}
//     res.json(201, dataGet)
// });
//
// router.post("/test/", function (req, res) {
//     var dataPost = {
//         number: req.body.number,
//         message: req.body.message }
//     res.json(201, dataPost)
// })
//
// router.post("/test/:post", function (req, res) {
//     var dataPost = {
//         post: req.params.zmienna,
//         number: req.body.number,
//         message: req.body.message }
//     res.json(201, dataPost)
// })
//
//
// router.put("/test/", function (req, res) {
//
//     var dataPut = {
//         post: req.params.zmienna,
//         number: req.body.number,
//         message: req.body.message
//     }
//     console.log("działa")
//     res.json(201, dataPut)
// })
//
// router.put("/test/:put", function (req, res) {
//
//     var dataPut = {
//         post: req.params.put,
//         number: req.body.number,
//         message: req.body.message
//     }
//
//     res.json(201, dataPut)
// })
//
// router.delete("/test/", function (req, res) {
//
//     var dataPut = {
//         post: req.params.put,
//         number: req.body.number,
//         message: req.body.message
//     }
//
//     res.json(201, dataPut)
// })
//
// router.delete("/test/:delete", function (req, res) {
//
//     var dataPut = {
//         post: req.params.delete,
//         number: req.body.number,
//         message: req.body.message
//     }
//
//     res.json(201, dataPut)
// })


var Busboy = require('busboy');


router.post('/upload', function (req, res) {


    var busboy = new Busboy({headers: req.headers});
    var base64data = "";
    var filetype = "";
    var name = "";
    var argum = [];
    var data2

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

        var buffer = "";
        filetype = mimetype;
        name = filename;


        file.setEncoding('base64');


        file.on('data', function (data) {
            buffer += data;


        });
        file.on('end', function () {
            base64data = buffer;

        });


    });


    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {

        argum.push(val);

    });
    busboy.on('finish', function () {

        res.json(base64data)


        var file = new fileModel({
            fileData: base64data,
            mimeType: filetype,
            fileName: name,
            fileOwner: argum[0],
            desc: argum[1]
        })
        //
        file.save(function (err, file) {
            if (err) {
                return next(err)
            }
            // res.json(201, newData)
            console.log("Save in database" + file.desc)

        })

    });

    req.pipe(busboy);


});


router.get("/show/:i", function (req, res) {

    // var dataGet = {fileName: req.params.i}
    var dataGet = {fileName: req.params.i}

    fileModel.findOne(dataGet).exec(function (err, doc) {
        if (err) {
            return next(err)
        }


        var ress = {
            fileData: doc.fileData,
            mime: doc.mimeType,
            name: doc.fileName
        }


        res.json(ress)


        // res.contentType('image/jpeg')
        // buffer = new Buffer(doc.fileData, ['base64'])
        // res.send(buffer) // musi być Buffer
    })
});


router.post('/display/', function (req, res) {
    var data = {
        file: req.body.fileData,
        mime: req.body.mime,
        name: req.body.name
    }

    res.json(data)
})


module.exports = router;