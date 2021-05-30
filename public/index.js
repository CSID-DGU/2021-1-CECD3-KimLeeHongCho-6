var textract = require('textract');
var text=textract.fromFileWithPath("myfile.odt");

var t = document.getElementById("textract");
t.innerText = text;