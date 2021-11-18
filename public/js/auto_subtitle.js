var video_bnt = document.getElementById('video_file');
video_bnt.addEventListener('change', function (){
    $('#auto_area').empty();

    $("#menu_select").css("display", "none");
    $('#auto_area').css("display", "block");
    $('#auto_bnt').css({ "background-color": "rgb(65, 70, 95)", "color": "white" });
    $('#odf_area').css("display", 'none');
    $('#odf_bnt').css({ "color": "rgb(65, 70, 95)", "background-color": "white" });
    $('#user_area').css("display", "none");
    $('#user_bnt').css({ "color": "rgb(65, 70, 95)", "background-color": "white" });

    var video_file = video_bnt.files[0];
    var video_content = document.getElementById("video-1");
    video_content.src = window.URL.createObjectURL(video_file);

    $('#auto_area').append("<div id='loading'>자막생성중입니다</div>")


    $.ajax({
        type : "POST",            
        url : "/auto_subtitle",     
        data : {
            'src' : video_file.name
        },
        dataType: 'JSON',            
        success: function (rtn) {
            const message = rtn.text;
            console.log(message)
            var output = document.getElementById('auto_area');
            var line = message.replace(/\r\n/g, '\n').split('\n');

            var html = '<table border="1" style="width:100%" >';
            for (var i = 0; i < (line.length); i++) {
                    html += '<tr><td>' + (i+1) + '</td><td contenteditable="true">' + line[i]+'</td>';
            }
            html += '</table>';
            $('#loading').remove();
            $("#auto_area").append(html);

            var btn = document.createElement('button');
            btn.textContent = '저장';

            btn.addEventListener('click', function (e) {
                var tbl = document.querySelector('#auto_area table');
                var arr = [];
                for (var i = 0; i < tbl.rows.length; i++) {
                    arr.push(tbl.rows[i].cells[1].textContent);
                }
                var txt = arr.join('\r\n');
                var blob = new Blob([txt], { type: 'text/plain' });
                var a = document.createElement('a');
                a.download = 'auto.vtt'
                a.href = window.URL.createObjectURL(blob);
                a.click();
            });
            output.appendChild(btn);
        }
    })
})