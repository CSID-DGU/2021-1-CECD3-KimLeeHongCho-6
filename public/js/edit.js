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
            for (var j = 0; j < 1; j++) {
                html += '<td>' + (i + 1) + '</td><contenteditable="true">' + line[i] + '</td>';
            }
            html += '</tr>';
        }
        html += '</table>';
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