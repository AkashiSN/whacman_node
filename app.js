const axios      = require('axios');
const express    = require('express');
const bodyParser = require('body-parser');
const SerialPort = require("serialport");

const app = express();

var playerId = 0

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(process.env.PORT || 4444);
console.log('Server is online.');

var port = new SerialPort("/dev/tty.usbmodem1411", {
    baudrate: 9600,
    dataBits: 8,
    parity: 'none',
    flowControl: false,
    parser: SerialPort.parsers.readline("\n")
});

port.on('error', function(err, req, res) {
    res.end();
});

port.on('open', function(err) {
    console.log('serial open');
});

port.on('data', function(data) {
  console.log('data received: ' + data + ', playerId: ' + playerId); // HITされた
  var options = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  axios.put('http://localhost:3000/api/players/' + playerId, { hit: 1 }, options)
    .then(function(res) {
        console.log('hit sended');
    })
    .catch(function(err) {
      console.log(err);
    })
});

app.post('/api/timer', function(req, res) {
    if(req.body.start) {
        sendSignal('1');
        console.log('start');
        playerId = req.body.player_id;
        res.send('start');
    } else if(req.body.stop) {
        sendSignal('0');
        console.log('stop');
        res.send('stop');
    }
});

function sendSignal(msg) {
    setTimeout(function() {
        port.write(msg);
        console.log('Sended ', msg);
    }, 200);
    // NOP的な待ち時間が必要ぽい
}
