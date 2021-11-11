var sub_num = 1;
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



$(document).ready(function () {
    var cuesTime = [];
    var onHover = [];
    jumpToTime = function (video_id, t) {
        document.getElementById('video-' + video_id).currentTime = t + 0.01;
    }
    onTrackLoad = function (video_id) {
        var track = document.getElementById("entrack-" + video_id).track; // get text track from track element          
        var cues = track.cues;
        for (var i = 0; i < cues.length; i++) {
            if (i == 0) {
                cuesTime[video_id] = [];
                cuesTime[video_id][i] = 0;
                $('#display-cues-' + video_id).append('<p onclick="jumpToTime(' + 1 + ', ' + cues[i].startTime + ')" data-start-time-video-' + video_id + '="0" class="cue-active">' + cues[i].text + '</p>');
            }
            else {
                cuesTime[video_id][i] = cues[i].startTime;
                $('#display-cues-' + video_id).append('<p onclick="jumpToTime(' + 1 + ', ' + cues[i].startTime + ')" data-start-time-video-' + video_id + '="' + cues[i].startTime + '">' + cues[i].text + '</p>');
            }
        }

        onHover[video_id] = false;
        $('#display-cues-' + video_id).scrollTop(0);
        track.mode = "hidden";
    }

    onSearchLoad = function(video_id) {
        const search = document.getElementById('search_text').value;
        var track = document.getElementById("entrack-"+video_id).track; // get text track from track element          
        var cues = track.cues;
        var count = 0;

        $('p').remove( '.s_text' ); //검색할 때마다, display창 지우기

        if(search == ""){
          alert("검색어를 입력하세요.");
        }
        else{
          for (var i = 0; i < cues.length; i++) {
          if(cues[i].text.includes(search)){
            count++;
            var subt = cues[i].text;
            var regex = new RegExp(search, "g");
            subt = subt.replace(regex, "<span class='highlight'>" + search + "</span>"); // highlight class

            if(i == 0){
              cuesTime[video_id] = [];
              cuesTime[video_id][i] = 0;
               $('#s_area').append('<p class="s_text" onclick="jumpToTime(' + video_id + ', ' + cues[i].startTime + ')" sub-data-start-time-video-' + video_id + '="0">' + subt + '</p>');				
            }else{
              cuesTime[video_id][i] = cues[i].startTime;
              $('#s_area').append('<p class="s_text" onclick="jumpToTime(' + video_id + ', ' + cues[i].startTime + ')" sub-data-start-time-video-' + video_id + '="' + cues[i].startTime + '">' + subt + '</p>');
            }
          }
        }
        if(count == 0){
          $('#s_area').append('<p class="s_text"> 해당 검색어가 포함된 자막은 존재하지 않습니다. </p>');
        }
      }
      onHover[video_id] = false;
      $('#s_area').scrollTop(0);
    }

    $(".video_content").on
        (
            "timeupdate",
            function (event) {
                var video_id = (this.id).substring(6);
                //console.log(video_id);
                var currentTime = this.currentTime;

                for(video_id = 1; video_id < sub_num; video_id++){
                var cueTimeCurrent = 0;
                for (var i = 0; i < cuesTime[video_id].length; i++) {
                    if ((currentTime - cuesTime[video_id][i]) <= 0) {
                        cueTimeCurrent = cuesTime[video_id][i - 1];
                        break;
                    }
                    cueTimeCurrent = cuesTime[video_id][i];
                }

                if (currentTime == 0) {
                    cueTimeCurrent = 0;
                }
                //for(var i = i; i <= sub_num; i++){
                $('#display-cues-' + video_id + ' .cue-active').removeClass('cue-active');
                $('[data-start-time-video-' + video_id + '="' + cueTimeCurrent + '"]').addClass('cue-active');
                //}
                var offsetTop = $('[data-start-time-video-' + video_id + '="' + cueTimeCurrent + '"]').offset().top - $('#start-point-' + video_id).offset().top;
                if (!onHover[video_id]) {
                    $('#display-cues-' + video_id).scrollTop(offsetTop - 150);
                }
                }
            }
        );

    $('.display-cues').hover
        (
            function (event) {
                var video_id = (this.id).substring(13);
                onHover[video_id] = true;
            },
            function () {
                var video_id = (this.id).substring(13);
                onHover[video_id] = false;
            }
        );

    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');
    
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
    
        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });


    $("#upload_file").on('change', function () {
        files = $("#upload_file")[0];
        $("#file_name").text(files.files[0].name);
        var formData = new FormData();
        formData.append("upload_file", files.files[0])
        $.ajax({
            type: "POST",
            url: "/upload",
            processData: false,
            contentType: false,
            data: formData,
            success: function (rtn) {
                $('#odf_area').remove("table, #save_bnt");
                const message = rtn.text;
                var output = document.getElementById('odf_area');
                var line = message.replace(/\r\n/g, '\n').split('\n');
                
                var html = '<table border="1" style="width:100%" >';
                for (var i = 1; i < (line.length *2); i+=2) {
                    if(line[(i+1)/2]!=undefined && line[(i+1)/2]!=''){
                        html += '<tr><td>' + i + '</td><td onclick="time_stamp(this)" contenteditable="true">클릭시 시간입력</td>';
                        html += '<tr>'
                        html += '<td>' + (i + 1) + '</td><td contenteditable="true">' + line[(i+1)/2] + '</td>';
                        html += '</tr>';
                    }
                }
                html += '</table>';
                $("#odf_area").append(html);
                
                var btn = document.createElement('button');
                btn.id = "save_bnt"
                btn.textContent = '저장';
        
                btn.addEventListener('click', function (e) {
                    var tbl = document.querySelector('#odf_area table');
                    var arr = [];
                    for (var i = 0; i < tbl.rows.length; i++) {
                        arr.push(tbl.rows[i].cells[1].textContent);
                    }
                    var txt = arr.join('\r\n');
                    var blob = new Blob([txt], { type: 'text/plain' });
                    var a = document.createElement('a');
                    a.download = 'odf.vtt'
                    a.href = window.URL.createObjectURL(blob);
                    a.click();
                });
                output.appendChild(btn);
            },
            err: function (err) {
                console.log("err:", err)
            }
        })
    });

});

$('#toHome_btn').hover(function(){
    $(this).children('img').css("filter","invert(97%) sepia(0%) saturate(0%) hue-rotate(60deg) brightness(103%) contrast(103%)");
},function(){
    $(this).children('img').css("filter", "invert(75%) sepia(58%) saturate(3550%) hue-rotate(176deg) brightness(90%) contrast(91%)");
});

$('#toPlay_btn').hover(function(){
    $(this).children('img').css("filter","invert(97%) sepia(0%) saturate(0%) hue-rotate(60deg) brightness(103%) contrast(103%)");
},function(){
    $(this).children('img').css("filter", "invert(75%) sepia(58%) saturate(3550%) hue-rotate(176deg) brightness(90%) contrast(91%)");
});

$('#toEdit_btn').hover(function(){
    $(this).children('img').css("filter","invert(97%) sepia(0%) saturate(0%) hue-rotate(60deg) brightness(103%) contrast(103%)");
},function(){
    $(this).children('img').css("filter", "invert(75%) sepia(58%) saturate(3550%) hue-rotate(176deg) brightness(90%) contrast(91%)");
});

$('#toUser_btn').hover(function(){
    $(this).children('img').css("filter","invert(97%) sepia(0%) saturate(0%) hue-rotate(60deg) brightness(103%) contrast(103%)");
},function(){
    $(this).children('img').css("filter", "invert(39%) sepia(62%) saturate(270%) hue-rotate(190deg) brightness(89%) contrast(90%)");

});


$('#auto_bnt').click(function(){
    $("#menu_select").css("display","none");
    $('#auto_area').css("display","block");
    $('#auto_bnt').css({"background-color": "rgb(65, 70, 95)", "color" : "white"});
    $('#odf_area').css("display",'none');
    $('#odf_bnt').css({"color": "rgb(65, 70, 95)", "background-color" : "white"});
    $('#user_area').css("display","none");
    $('#user_bnt').css({"color": "rgb(65, 70, 95)", "background-color" : "white"});
})

$('#odf_bnt').click(function(){
    $("#menu_select").css("display","none");
    $('#auto_area').css("display","none");
    $('#auto_bnt').css({"color": "rgb(65, 70, 95)", "background-color" : "white"});
    $('#odf_area').css("display",'block');
    $('#odf_bnt').css({"background-color": "rgb(65, 70, 95)", "color" : "white"});
    $('#user_area').css("display","none");
    $('#user_bnt').css({"color": "rgb(65, 70, 95)", "background-color" : "white"});
})

$('#user_bnt').click(function(){
    $("#menu_select").css("display","none");
    $('#auto_area').css("display","none");
    $('#auto_bnt').css({"color": "rgb(65, 70, 95)", "background-color" : "white"});
    $('#odf_area').css("display",'none');
    $('#odf_bnt').css({"color": "rgb(65, 70, 95)", "background-color" : "white"});
    $('#user_area').css("display","block");
    $('#user_bnt').css({"background-color": "rgb(65, 70, 95)", "color" : "white"});
})
