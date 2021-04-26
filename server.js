let mysql = require('mysql');
let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');

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

let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON
let util = require('util'); // for async calls
const query = util.promisify(conn.query).bind(conn);
app.use(express.static(path.join(__dirname, 'public')));

app.get("/index", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.post("/post", urlencodedParser, function (req, res) {
    let sql;
    console.log("body: %j", req.body);
    let jsonObj = req.body;
    console.log("Otsikko: " + jsonObj.otsikko);

    sql = "INSERT INTO taulukko1(id, rivi, otsikko, teksti)"
        + " VALUES ( ?, ?, ?, ?)";

    let responseString = JSON.stringify(jsonObj)
    res.send("POST succesful: "+ responseString);

    (async () => { // IIFE (Immediately Invoked Function Expression)
        try {
            const result = await query(sql, [jsonObj.id, jsonObj.rivi, jsonObj.otsikko, jsonObj.teksti]);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});



let server = app.listen(8080, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})