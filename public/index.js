var textract = require('textract');
var text=textract.fromFileWithPath("myfile.odt");

var t = document.getElementById("textract");
t.innerText = text;

function load_video(){
    var video_file = document.getElementById("video_file").files[0];
    var video_content = document.getElementById("video_content");
    video_content.src = window.URL.createObjectURL(video_file);
}

function load_text(){
    var fileObject = document.getElementById("text_file");
    var fileName = fileObject.files[0];

    var fr = new FileReader();
    fr.readAsText(fileName, "utf-8");

    fr.onload=()=>{
        var text = document.getElementById("text_content");
        text.innerText = fr.result;
    }
}