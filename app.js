global.root = process.env.BASEURL || "http://127.0.0.1:8181/";
global.log = console.log

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const mysql = require("mysql");

let database = mysql.createConnection({
    host: "localhost",
    user: "medt",
    password: "123",
    database: "schuelerverwaltung"
});

app.set('view engine', 'pug');
app.use(express.static('resources'));

app.get('/', (req, res) => {serve(req, res)});

function serve(req, res, msg) {
    if (req.query.klasse !== undefined && req.query.klasse !== "") database.query("select * from students where cls = ?", [req.query.klasse], (...data) => {renderHome(res, data, msg, req.query.klasse)})
    else database.query("select * from students", (...data) => {renderHome(res, data, msg, req.query.klasse)})
}

function renderHome(res, data, msg, cls = "") {
    if (data[0]) console.log(data[0])
    else {
        res.render('home', {name: "Home", students: JSON.stringify(data[1]), cls, msg});
    }
    
    res.end()
}


app.post("/", function (req, res) {
    let { body } = req
    if (body.type === "delete") {
        if (body.dir === undefined) body.dir = null
        database.query("delete from students where firstName = ? and sirName = ? and cls = ?", [body.firstName, body.sirName, body.cls], function (err) {
            serve(req, res, err)
        });
    }
    else if (body.type === "new") {
        if (body.dir === undefined) body.dir = null
        database.query("INSERT INTO students VALUES (?,?,?,?)", [body.firstName, body.sirName, body.cls, body.dir], function (err) {
            serve(req, res, err)
        });
    }
});

app.listen(8181, function (err) {
    if (err)
        console.log(err);
    console.log("Listening on 8181");
});