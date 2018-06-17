module.exports = sio;
var dateformat = require('dateformat');
var sendmail = require('sendmail')();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hosokai'
});

function sio(server) {
    var io = require('socket.io')(server);
    //接続
    io.on('connection', (socket) => {
        socket.on('login', (data) => {
            socket.broadcast.emit('login', {
                username: data.name,
                firstget: 0,
                firstmiss: 0,
                secondhit: 0,
                secondmiss: 0,
                thirdhit: 0,
                thirdmiss: 0,
                fourthhit: 0,
                fourthmiss: 0,
            });
        });
        socket.on('logout', (data) => {
            socket.broadcast.emit('logout', {
                username: data.name,
                time: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            });
        })
        socket.on('getMessageHit', (data) => {
            console.log(connection)
            var test;
            connection.query('select * from score', function(error, results, fields) {
                if (error) throw error;

                test = results[0]
            });
            io.emit('getMessageHit', {
                username: data.name,
                getnum: data.getnum,
            });
            // connection.query('INSERT INTO score (id, name, page, hit, miss, update_at, create_at) VALUES (NULL, '+data.name+', "1", '+data.getnum+', "0", "2018-06-15 00:00:00", "2018-06-15 00:00:00")');
        });
        socket.on('getMessageMiss', (data) => {
            io.emit('getMessageMiss', {
                username: data.name,
                getnum: data.getnum,
            });
        });
        socket.on('gameset', (data) => {
            io.emit('gameset')
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