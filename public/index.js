var textract = require('textract');
var text=textract.fromFileWithPath("myfile.odt");

var t = document.getElementById("textract");
t.innerText = text;

function load_video(){
    var video_file = document.getElementById("video_file").files[0];
    var video_content = document.getElementById("video-1");
    video_content.src = window.URL.createObjectURL(video_file);
}

function load_Subtitle(){
    var subtitle_file = document.getElementById("subtitle_file").files[0];
    var subtitle_content = document.getElementById("entrack-1");
    subtitle_content.src = window.URL.createObjectURL(subtitle_file);
}