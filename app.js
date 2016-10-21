const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3000);
console.log('Server is online.');

app.post('/api/timer', function(req, res) {
    if(req.body.start) {
        console.log('start');
        res.send('start');
        // TODO: ここでなんか処理する
    } else if(req.body.stop) {
        console.log('stop');
        res.send('stop');
        // TODO: ここでなんか処理する
    }
})
