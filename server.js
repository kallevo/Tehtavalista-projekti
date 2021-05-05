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

app.get("/archive", function (req, res) {
    res.sendFile(__dirname + "/" + "archive.html");
})

//Tietokannan taulukko1:een lisääminen
app.post("/posttaulukko1", urlencodedParser, function (req, res) {
    let sql1, sql2, sql3, sql4;
    console.log("body: %j", req.body);
    let jsonObj = req.body;
    console.log("Otsikko: " + jsonObj.otsikko);

    sql1 = "INSERT INTO taulukko1(id, rivi, kategoria, otsikko, teksti)"
        + " VALUES ( ?, ?, ?, ?, ?)";

    sql2 = "UPDATE taulukko1"
        + " SET otsikko=?, teksti=?"
        + " WHERE id=? AND rivi=?";

    sql3 = "UPDATE taulukko1"
        + " SET valmis=?"
        + " WHERE id=? AND rivi=?";

    sql4 = "UPDATE taulukko1"
        + " SET kategoria=?"
        + " WHERE rivi=?";

    let responseString = JSON.stringify(jsonObj)
    res.send("POST succesful: "+ responseString);

    (async () => { // IIFE (Immediately Invoked Function Expression)
        try {
            if (jsonObj.edit === "false") {
                const result = await query(sql1, [jsonObj.id, jsonObj.rivi, jsonObj.kategoria, jsonObj.otsikko, jsonObj.teksti]);
            } else if (jsonObj.edit === "true") {
                const result = await query(sql2, [jsonObj.otsikko, jsonObj.teksti, jsonObj.id , jsonObj.rivi]);
            } else if (jsonObj.valmis === "true") {
                const result = await query(sql3, [jsonObj.valmis, jsonObj.id , jsonObj.rivi]);
            } else if (jsonObj.kategoria !== undefined) {
                const result = await query(sql4, [jsonObj.kategoria, jsonObj.rivi]);
            }
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});
//Tietokannan arkistoon lisääminen ja taulukko1:stä poistaminen
app.post("/postarkisto", urlencodedParser, function (req, res) {
    let sql1, sql2, sql3, sql4;
    console.log("body: %j", req.body);
    let jsonObj = req.body;
    console.log("Poiston id: " + jsonObj.id);
    console.log("Poiston rivi: " + jsonObj.rivi);

    sql1 = "INSERT INTO Arkisto"
        + " SELECT * FROM taulukko1"
        + " WHERE rivi=? AND id=?"

    sql2 = "DELETE FROM taulukko1"
        + " WHERE rivi=? AND id=?"

    sql3 = "INSERT INTO Arkisto"
        + " SELECT * FROM taulukko1"
        + " WHERE rivi=?"

    sql4 = "DELETE FROM taulukko1"
        + " WHERE rivi=?"

    let responseString = JSON.stringify(jsonObj)
    res.send("POST succesful: "+ responseString);

    (async () => { // IIFE (Immediately Invoked Function Expression)
        try {
            if (jsonObj.montapoistoa === "false") {
                const result1 = await query(sql1, [jsonObj.rivi, jsonObj.id]);
                const result2 = await query(sql2, [jsonObj.rivi, jsonObj.id]);
            } else if (jsonObj.montapoistoa === "true") {
                const result3 = await query(sql3, [jsonObj.rivi]);
                const result4 = await query(sql4, [jsonObj.rivi]);
            }
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});

//Tietokannasta hakeminen
app.get("/gettaulukko1", function (req, res) {
    let string;

    let sql = "SELECT *"
        + " FROM taulukko1"
        + " ORDER BY id";

    (async () => { // IIFE (Immediately Invoked Function Expression)
        try {
            const rows = await query(sql);
            string = JSON.stringify(rows);
            let result = '{"numOfRows":' + rows.length + ', "rows":' + string + '}';
            console.log("Rivejä: " + rows.length);
            console.log(rows);
            res.send(result);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});

app.get("/getarkisto", function (req, res) {
    let string;

    let sql = "SELECT *"
        + " FROM Arkisto"
        + " ORDER BY database_id";

    (async () => { // IIFE (Immediately Invoked Function Expression)
        try {
            const rows = await query(sql);
            string = JSON.stringify(rows);
            let result = '{"numOfRows":' + rows.length + ', "rows":' + string + '}';
            console.log("Rivejä: " + rows.length);
            console.log(rows);
            res.send(result);
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