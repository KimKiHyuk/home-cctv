const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const rtsp = require('rtsp-ffmpeg')
const _ = require("dotenv").config({ path: ".env" })
  
server.listen(8888);
stream = new rtsp.FFMpeg({input: process.env.CCTV_1});
io.on('connection', function(socket) {
  var pipeStream = function(data) {
    socket.emit('data', data.toString('base64'));
  };
  stream.on('data', pipeStream);
  socket.on('disconnect', function() {
    stream.removeListener('data', pipeStream);
  });
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

console.log("server is running on http://localhost:8888")