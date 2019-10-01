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
// --------------------------------------------------------------

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