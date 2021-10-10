var express = require('express');
var fileUpload = require('express-fileupload')
var textract = require('textract')
var bodyParser = require('body-parser')
var app = express();
var router = require('./router/main')(app);
const spawn = require('child_process').spawn;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(fileUpload());

app.post('/upload', function (req, res) {
    var file = req.files.upload_file;
    textract.fromBufferWithMime(file.mimetype, file.data,{preserveLineBreaks:true}, function (error, text) {
        res.json({"text":text})
     })
});

app.post('/auto_subtitle', function (req, res) {
    var params = req.body.src;
    console.log(params)
    const result = spawn('python',['public/test.py', params]);

    result.stdout.on('data',function(data){
        console.log(data.toString())
    })

    result.stderr.on('data', function(data) {
        console.log(data.toString()); 
    });
});


var server = app.listen(3000,function(){
    console.log("Express server has started on port 3000")
});


app.use(express.static('public'));