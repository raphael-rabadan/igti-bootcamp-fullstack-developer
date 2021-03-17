window.addEventListener("load", start)

function start() {
  console.log("aula de eventos")
  console.log("Página carregada")

  document.querySelector("#nameInput").addEventListener('keyup', countName)
  document.querySelector("form").addEventListener("submit", preventSubmit)
}

function countName(event) {
 document.querySelector("#nameLength").textContent = event.target.value.length
}

function preventSubmit(event) {
  event.preventDefault();
  window.alert("Usuário cadastrado com sucesso.")
}

