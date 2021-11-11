var subtitle_bnt = document.getElementById('subtitle_file')
subtitle_bnt.addEventListener('change', function () {
    var subtitle_file = subtitle_bnt.files[0];
    var subtitle_content = document.getElementById("entrack-" + sub_num);
    subtitle_content.src = window.URL.createObjectURL(subtitle_file);

    var tab_text = document.getElementById("t" + sub_num).innerText;

    var replacedString = tab_text.replace("자막_" + sub_num, subtitle_file.name);
    document.getElementById("t" + sub_num).innerText = replacedString;

    sub_num++;
    var addStaffText = '<track onload="onTrackLoad(' + sub_num + ');" class="subtitle_content" id="entrack-' + sub_num + '" label="English" kind="subtitles" srclang="ko">';
    var trHtml = $("track:last");
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