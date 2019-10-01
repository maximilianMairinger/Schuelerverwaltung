let log = console.log
let c = (sel) => {return document.querySelector(sel)}
let ce = (elem) => {return document.createElement(elem)}
let students = (() => {
  let dataElem = c("#data")
  let data = JSON.parse(dataElem.innerHTML);
  dataElem.remove()
  return data
})()
let list = c("#list")
// --------------------------------------------------------------

students.forEach(({firstName, sirName, cls, dir}) => {
  let student = ce("li")
  student.innerHTML = firstName + " " + sirName + " " + cls + " " + (dir === null ? "" : dir)

  let form = c("form")
  form.action = "/"
  form.method = "POST"
  form.id = "ahshgdsah"

  let btn = c("button")
  btn.innerHTML = "Delete"
  form.append(btn)


  let hiddenElems = c("div")
  hiddenElems.style.display = "none"

  let h1 = c("input")
  h1.name = "firstName"
  h1.value = firstName
  let h2 = c("input")
  h2.name = "sirName"
  h2.value = sirName
  let h3 = c("input")
  h3.name = "cls"
  h3.value = cls

  hiddenElems.append(h1, h2, h3)

  list.append(student)
  
  
})