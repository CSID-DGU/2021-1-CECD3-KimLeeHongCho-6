var sub_num = 1;
var video_bnt = document.getElementById('video_file');
video_bnt.addEventListener('change', function (){
    var video_file = video_bnt.files[0];
    var video_content = document.getElementById("video-1");
    video_content.src = window.URL.createObjectURL(video_file);

    console.log(video_content.value);
})

var subtitle_bnt = document.getElementById('subtitle_file')
subtitle_bnt.addEventListener('change',function(){
        var subtitle_file = subtitle_bnt.files[0];
        var subtitle_content = document.getElementById("entrack-"+sub_num);
        subtitle_content.src = window.URL.createObjectURL(subtitle_file);

        var tab_text = document.getElementById("t"+sub_num).innerText;

        var replacedString = tab_text.replace("자막_"+sub_num, subtitle_file.name);
        document.getElementById("t"+sub_num).innerText = replacedString;

        sub_num++;
        var addStaffText = '<track onload="onTrackLoad('+sub_num+');" class="subtitle_content" id="entrack-'+sub_num+'" label="English" kind="subtitles" srclang="ko">';
        var trHtml = $( "track:last" );
        trHtml.after(addStaffText);

    /*if(sub_num >= 4){
        var addTab = '<li class="tab-link" data-tab="tab-'+sub_num+'" name="sub_tab">자막_'+sub_num+'</li>';
        var tabHtml = $( "li[name=sub_tab]:last" );
        tabHtml.after(addTab);
        //$('.tabs').append('<li class="tab-link" data-tab="tab-'+sub_num+'">자막_'+sub_num+'</li>');

        var addTabCon = '<div id="tab-'+sub_num+'" class="tab-content" name="con_tab"><div id="display-cues-'+sub_num+'"><p id="start-point-'+sub_num+'"></p></div></div>';
        var tabConHtml = $( "div[name=con_tab]:last" );
        tabConHtml.after(addTabCon);
    }*/
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
        var formData = new FormData();
        formData.append("upload_file", files.files[0])
        $.ajax({
            type: "POST",
            url: "/upload",
            processData: false,
            contentType: false,
            data: formData,
            success: function (rtn) {
                const message = rtn.text;
                console.log("message: ", message)
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
    $(this).children('img').css("filter", "invert(39%) sepia(62%) saturate(270%) hue-rotate(190deg) brightness(89%) contrast(90%)");
});

$('#toPlay_btn').hover(function(){
    $(this).children('img').css("filter","invert(97%) sepia(0%) saturate(0%) hue-rotate(60deg) brightness(103%) contrast(103%)");
},function(){
    $(this).children('img').css("filter", "invert(39%) sepia(62%) saturate(270%) hue-rotate(190deg) brightness(89%) contrast(90%)");
});

$('#toEdit_btn').hover(function(){
    $(this).children('img').css("filter","invert(97%) sepia(0%) saturate(0%) hue-rotate(60deg) brightness(103%) contrast(103%)");
},function(){
    $(this).children('img').css("filter", "invert(39%) sepia(62%) saturate(270%) hue-rotate(190deg) brightness(89%) contrast(90%)");
});

$('#toUser_btn').hover(function(){
    $(this).children('img').css("filter","invert(97%) sepia(0%) saturate(0%) hue-rotate(60deg) brightness(103%) contrast(103%)");
},function(){
    $(this).children('img').css("filter", "invert(39%) sepia(62%) saturate(270%) hue-rotate(190deg) brightness(89%) contrast(90%)");
});