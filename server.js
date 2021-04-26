let mysql = require('mysql');
let express = require('express');
let app = express();
let path = require('path');

const conn = mysql.createConnection({
    host: "mysql.metropolia.fi",
    user: "kallevo",
    password: "todo123",
    database: "kallevo"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

app.use(express.static(path.join(__dirname, 'public')));

app.get("/index", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.post("/post", function (req, res) {

});

let server = app.listen(8080, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})