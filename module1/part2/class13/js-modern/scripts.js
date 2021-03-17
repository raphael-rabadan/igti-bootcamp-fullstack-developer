var globalNames = null;
var globalInputName = null;
var globalCurrentIndex = null;
var isEditing = false;

window.addEventListener('load', () => {
  loadGlobalVariables()
  preventFormSubmit()
  activateInput()
  render()  
})

function loadGlobalVariables() {
  globalNames = ["Um", "Dois", "Três", "Quatro"]
  globalInputName = document.querySelector("#inputName")
}

function preventFormSubmit() {
  function handlePreventSubmit(event) {
    event.preventDefault();
  }  
  var form = document.querySelector("form");
  form.addEventListener('submit', handlePreventSubmit)
}

function activateInput() {
  function insertName(typedName) {
    globalNames = [...globalNames, typedName]
  }
  function updateName(newName) {
    globalNames[globalCurrentIndex] = newName
  }
  function handleTyping(event) {

    if (event.target.value.trim() === "") {
      clearInput()
      return;
    }

    if (event.key === "Enter") {
      actualName = event.target.value
      if (isEditing) {
        updateName(actualName)
      } else {
        insertName(actualName)
      }
      render()
      isEditing = false;
      clearInput();
    }
  }
  globalInputName.focus()
  globalInputName.addEventListener("keyup", handleTyping)
}

function render() {
  function createDeleteButton(index){
    function deleteName(){
      //globalNames.splice(index, 1)
      // globalNames = globalNames.filter((name, i) => {
      //   if (i === index) {
      //     return false
      //   }
      //   return true
      //   return i !== index
      // })
      globalNames = globalNames.filter((_, i) => i !== index)
      render()
    }
    var buttonDelete = document.createElement("button")
    buttonDelete.textContent = 'x'
    buttonDelete.classList.add("deleteButton")
    buttonDelete.addEventListener("click", deleteName)

    return buttonDelete
  }
  function createSpan(name, index) {
    function editItem() {
      globalInputName.value = name
      globalInputName.focus()
      isEditing = true;
      globalCurrentIndex = index
    }
    var span = document.createElement("span")
    span.textContent = name
    span.classList.add("clickable")
    span.addEventListener('click', editItem)
    return span
  }

  var divNames = document.querySelector("#names");
  divNames.innerHTML = "";
  var ul = document.createElement("ul")

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i]

    var li = document.createElement("li")
    var buttonDelete = createDeleteButton(i)
    var span = createSpan(currentName, i)

    li.appendChild(buttonDelete)
    li.appendChild(span)
    ul.appendChild(li)
  }

  divNames.appendChild(ul)
  clearInput()
}

const clearInput = () => {
  globalInputName.value = ""
  globalInputName.focus()
}