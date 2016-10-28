const axios      = require('axios')
const express    = require('express')
const bodyParser = require('body-parser')
const SerialPort = require("serialport")

const app = express()

const axiosOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

let playerId = 0

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.listen(process.env.PORT || 4000)
console.log('Server is online.')

// TODO: comNameを自動取得
const port = new SerialPort("/dev/tty.usbmodem1411", {
  baudrate: 9600,
  dataBits: 8
})

port.on('open', (err) => {
  console.log('serial open')
})

port.on('data', (data) => {
  console.log('data received!! playerId: ' + playerId.toString()) // HITされた
  axios.put('http://localhost:3000/api/players/' + playerId.toString(), { hit: 1 }, axiosOptions)
    .then((res) => {
      console.log('hit sended')
    })
    .catch((err) => {
      console.log(err)
    })
})

port.on('error', (err, req, res) => {
  res.end()
})

app.post('/api/timer', (req, res) => {
  if(req.body.start) {
    sendSignal('0')
    console.log('start')
    playerId = req.body.player_id
    res.send('start')
  } else if(req.body.stop) {
    sendSignal('1')
    console.log('stop')
    res.send('stop')
  }
})

const sendSignal = (msg) => {
  setTimeout(() => {
    port.write(msg)
    console.log('Sended ', msg)
  }, 200)
  // NOP的な待ち時間が必要ぽい
}
