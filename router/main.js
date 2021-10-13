module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html')
    });

    app.get('/play', function (req, res) {
        res.render('play.html');
    });

    app.get('/edit', function (req, res) {
        res.render('edit.html');
    });
}