# Schülerverwaltung - Arbeitsprotokoll

The following describes the functionality of Schülerverwaltung.

## Intoduction

Please note that this application depends and uses nodejs & pug as its framework as confirmed by prof. roshgar. If you are not familiar with pug, please consult their [website](https://pugjs.org/) or simple interpret the following code (its not that obscure).

## The code

### Backend

#### Node

```js
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
```

When GETing the site we check if the GET param klasse is present. If so query all all students for those those that have a matching class.

```js
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
```

When POSTing to root we check if type is delete (to delete a student) or new (to add one). We then act accordingly (insert / delete) with the given params `body.firstName, body.sirName, body.cls` and for new the optional `body.dir` .

On query finish we serve root with the optional parameter msg (err in this namespace) for potential errors in the query.

### SQL

```sql
DROP DATABASE IF EXISTS schuelerverwaltung;
CREATE DATABASE schuelerverwaltung;
USE schuelerverwaltung;


CREATE TABLE students
(
  firstName   varchar(64) NOT NULL,
  sirName     varchar(64) NOT NULL,
  cls         varchar(10)  NOT NULL,
  dir         varchar(10),
  PRIMARY KEY (firstName, sirName, cls)
);
```

This does not need explanation.

## Frontend

### pug

start.pug and end.pug are just generic files.

```
include start

span(style="display: none;" id="data") #{students}
if msg 
  h3 Message:
  p #{msg}


form(action="/" method="GET")#auswahl
  span klasse
  input(name="klasse" value=`${cls}`)

ul#list
```

The first span is a quickfix. Since pug does escape all to js traversed strings `<script>window.students = #{students}</script>` and back the I didnt know how to turn this off, we added the JSON data to the innerHTML of this span#data. and read it in home.js.

if the (sql error) msg is present show it with heading

Simple form for filtering after class.

Note `ul#list` . This is where we added the students in home.js.

```pug
div#new
  h3 New Student
  form(action="/" method="POST")
    span FirstName
    br
    input(name="firstName" value="")
    br
    br
    span SirName
    br
    input(name="sirName" value="")
    br
    br
    span Class
    br
    input(name="cls" value="")
    br
    br
    span Direction
    br
    input(name="dir" value="")
    br
    br
    input(type="submit" value="submit")

    input(name="type" value="new" style="display: none")

include end
```

The new student gui. Note the hidden input new which gives the type.

### client side js

```js
let log = console.log
let q = (sel) => {return document.querySelector(sel)}
let ce = (elem) => {return document.createElement(elem)}
let students = (() => {
  let dataElem = q("#data")
  let data = JSON.parse(dataElem.innerHTML);
  dataElem.remove()
  return data
})()
let list = q("#list")
```

Mostly for reference. Parses the student data & gets references to dom elems.

```js
students.forEach(({firstName, sirName, cls, dir}) => {
  let student = ce("li")
  let text = ce("span")
  text.innerHTML = firstName + " " + sirName + " " + cls + " " + (dir === null ? "" : dir)
  student.append(text)

  let form = ce("form")
  form.action = "/"
  form.method = "POST"
  form.id = "ahshgdsah"

  let btn = ce("input")
  btn.value = "Delete"
  btn.type = "submit"
  form.append(btn)


  let hiddenElems = ce("div")
  hiddenElems.style.display = "none"

  let h1 = ce("input")
  h1.name = "firstName"
  h1.value = firstName
  let h2 = ce("input")
  h2.name = "sirName"
  h2.value = sirName
  let h3 = ce("input")
  h3.name = "cls"
  h3.value = cls
  let h4 = ce("input")
  h4.name = "type"
  h4.value = "delete"


  hiddenElems.append(h1, h2, h3, h4)
  
  form.append(hiddenElems)

  student.append(form)

  list.append(student)
})
```

Loops through student data creating simple text display & hidden form for the delete functionality. Appends this elem to list.