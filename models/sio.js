module.exports = sio;
var dateformat = require('dateformat');
var sendmail = require('sendmail')();

function sio(server) {
    var io = require('socket.io')(server);
    //接続
    io.on('connection', (socket) => {
        socket.on('login', (data) => {
            socket.broadcast.emit('login', {
                username: data.name,
                time: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            });
        });
        socket.on('logout', (data) => {
            socket.broadcast.emit('logout', {
                username: data.name,
                time: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            });
        })
        socket.on('getMessageHit', (data) => {
            io.emit('getMessageHit', {
                username: data.name,
				getnum:data.getnum,
            });
        });
        socket.on('getMessageMiss', (data) => {
            io.emit('getMessageMiss', {
                username: data.name,
				getnum:data.getnum,
            });
        });
        socket.on('inv', (data) => {
            console.log(data.address);

            sendmail({
                from: 'simchat_for@yahoo.co.jp',
                to: data.address,
                subject: 'simchatからメッセージが送信されました',
                text: `https://simchat-for-is.herokuapp.com/login`
            }, function(err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
            });
        });
    });
}
