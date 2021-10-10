var output = document.getElementById('output');
var s_btn = document.getElementsByName('start');
var e_btn = document.getElementsByName('end');
var num = 1;

function addRow() {
    num++;
    var addStaffText = "<tr name='user_tr' id='tr_time_"+num+"'><td>타임라인"+'</td> <td name="time" id="td_'+num+'" contenteditable="true">시간</td>'+
    '<td><button name="start" onclick="s_time('+num+');">시작시간</button><button name="end" onclick="e_time('+num+');">종료시간</button></td></tr>'+
    "<tr name='user_tr' id='tr_sub_'"+num+"'><td>자막"+'</td> <td contenteditable="true">자막 입력</td><td><button onclick="delRow('+num+', this);">삭제</button></td></tr>';

    var trHtml = $( "tr[name=user_tr]:last" );

    trHtml.after(addStaffText);
    }
    
function delRow(tr_id, obj) {
    if(tr_id != 1)
    {
        document.getElementById('tr_time_'+tr_id).remove();
        var tr = $(obj).parent().parent();
        tr.remove();
    }
    else
    {
        alert("첫번째 행은 삭제할 수 없습니다.");
    }
}

function s_time(td_id) {
    var start = document.getElementById('video-1').currentTime;
    var td = document.getElementById('td_'+td_id);
    
    var hour = parseInt(start/3600) < 10 ? '0'+ parseInt(start/3600) : parseInt(start/3600); 
    var min = parseInt((start%3600)/60) < 10 ? '0'+ parseInt((start%3600)/60) : parseInt((start%3600)/60);
    var sec = start % 60 < 10 ? '0'+start % 60 : start % 60;
    var s_sec = ''+sec;
    

    td.textContent = hour+":"+min+":" + s_sec.substr(0,6) +" --> ";
}

function e_time(td_id) {
    var end = document.getElementById('video-1').currentTime;
    var td = document.getElementById('td_'+td_id);
    start = td.textContent.substring(0,17);
    var hour = parseInt(end/3600) < 10 ? '0'+ parseInt(end/3600) : parseInt(end/3600); 
    var min = parseInt((end%3600)/60) < 10 ? '0'+ parseInt((end%3600)/60) : parseInt((end%3600)/60);
    var sec = end % 60 < 10 ? '0'+end % 60 : end % 60;
    var s_sec = ''+sec;
    
    td.textContent = start+hour+":"+min+":" + s_sec.substr(0,6);
}
    
function download() {
    var tbl = document.querySelector('#output table');
            var arr = [];
            arr.push("WEBVTT FILE");
            for (var i = 0; i < tbl.rows.length; i++) {
                arr.push(tbl.rows[i].cells[1].textContent);
            }
            var txt = arr.join('\r\n');
            var blob = new Blob([txt], { type: 'text/plain' });
            var a = document.createElement('a');
            a.download = "sub.vtt";
            a.href = window.URL.createObjectURL(blob);
            a.click();
}

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