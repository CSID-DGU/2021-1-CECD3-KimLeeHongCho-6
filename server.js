var express = require('express');
var fileUpload = require('express-fileupload')
var textract = require('textract')
var app = express();
var router = require('./router/main')(app);

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(fileUpload());

app.post('/upload', function (req, res) {
    console.log(req.files.upload_file.mimetype)
    var file = req.files.upload_file
    textract.fromBufferWithMime(file.mimetype, file.data, function (error, text) {
        console.log(text)
     })
});


var server = app.listen(3000,function(){
    console.log("Express server has started on port 3000")
});


app.use(express.static('public'));