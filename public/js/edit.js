var myFile = document.getElementById('myFile');
var output = document.getElementById('output');

myFile.addEventListener('change', function (e) {
    var files = e.target.files;
    var file = files[0];
    if (!file) {
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var line = reader.result.replace(/\r\n/g, '\n').split('\n');
        var html = '<table border="1">';
        for (var i = 0; i < line.length; i++) {
            html += '<tr>';
            
                var cnt=line[i].indexOf("-->");
                if(cnt==-1){
                    html += '<td>' + (i + 1) + '</td><td contenteditable="true">' + line[i] + '</td>';
                }
                else{
                    html += '<tr><td>' + i + '</td><td onclick="time_stamp(this)" contenteditable="true">'+ line[i] +'</td>';
                }

            html += '</tr>';
        }
        html += '</table>';
        console.log(html)
        output.innerHTML = html;

        var btn = document.createElement('button');
        btn.textContent = '저장';

        btn.addEventListener('click', function (e) {
            var tbl = document.querySelector('#output table');
            var arr = [];
            for (var i = 0; i < tbl.rows.length; i++) {
                arr.push(tbl.rows[i].cells[1].textContent);
            }
            var txt = arr.join('\r\n');
            var blob = new Blob([txt], { type: 'text/plain' });
            var a = document.createElement('a');
            a.download = file.name;
            a.href = window.URL.createObjectURL(blob);
            a.click();
        });
        output.appendChild(btn);
    };
    reader.readAsText(file);
});

var video_bnt = document.getElementById('video_file');
video_bnt.addEventListener('change', function (){

    var video_file = video_bnt.files[0];
    var video_content = document.getElementById("video-1");
    video_content.src = window.URL.createObjectURL(video_file);
})

function time_stamp(e){
    var str=e.textContent;
    var cnt=str.match(/:/g);

    var time = document.getElementById('video-1').currentTime;
    
    var hour = parseInt(time/3600) < 10 ? '0'+ parseInt(time/3600) : parseInt(time/3600); 
    var min = parseInt((time%3600)/60) < 10 ? '0'+ parseInt((time%3600)/60) : parseInt((time%3600)/60);
    var sec = time % 60 < 10 ? '0'+time % 60 : time % 60;
    var s_sec = ''+sec;
    
    if(cnt==null){
        e.textContent = hour+":"+min+":" + s_sec.substr(0,6) +" --> ";
    }
    else if(cnt.length!=2){
        e.textContent = hour + ":" + min + ":" + s_sec.substr(0, 6) + " --> ";
    }
    else{
        e.textContent = str + hour + ":" + min + ":" + s_sec.substr(0, 6);
    }
}