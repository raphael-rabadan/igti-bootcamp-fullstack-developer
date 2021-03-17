
window.addEventListener('load', start)

function start(event) {
  var form = document.querySelector("form");
  form.addEventListener('submit', preventSubmit)

  var campoNome = document.querySelector("#inputName")
  campoNome.addEventListener('keyup', analisarCampoNome)
}

function preventSubmit(event) {
  event.preventDefault();
}

function analisarCampoNome(event) {
  if (event.key === "Enter" && document.querySelector("#inputName").value.trim().length > 0) {
    var ulNomes = document.querySelector("#ulNomes")
        // Checa se existe UL e cria caso não exista
    if (ulNomes === null) {
      var div = document.querySelector("#names")
      ulNomes = document.createElement("ul")
      ulNomes.setAttribute("id", "ulNomes")
      div.appendChild(ulNomes)
    }

    var liNomeAtual = document.createElement("li")
    liNomeAtual.textContent = document.querySelector("#inputName").value
    
    var spanAtual = document.createElement("span")
    spanAtual.textContent = "[X]"
    spanAtual.classList.add("deleteButton")
    spanAtual.classList.add("clickable")
    spanAtual.addEventListener("click", apagarNome)
    liNomeAtual.addEventListener("click", atualizaNome)
    liNomeAtual.prepend(spanAtual)
    ulNomes.appendChild(liNomeAtual)
  }

  function apagarNome(event) {
    event.target.parentElement.remove()
    document.querySelector("#ulNomes")
  }

  function atualizaNome(event) {
    console.log(event.target.textContent)
  }
}