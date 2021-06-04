var textract = require('textract');
var text=textract.fromFileWithPath("myfile.odt");

var t = document.getElementById("textract");
t.innerText = text;

function load_video(){
    var video_file = document.getElementById("video_file").files[0];
    var video_content = document.getElementById("video_content");
    video_content.src = window.URL.createObjectURL(video_file);
}