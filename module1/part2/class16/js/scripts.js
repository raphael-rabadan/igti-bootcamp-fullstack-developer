window.addEventListener("load", () => {  
  doFetch()
  doFetchAsync()

  divisionPromise(12, 6).then(result => {
    console.log(result)
  })

  executeDivisionPromise()
  executeDivisionPromiseAsyncAwait();
})

function doFetch() {
  fetch("https://api.github.com/users/raphael-rabadan").then(res => {
    res.json().then(data => {
      showData(data)
    })
  }).catch(error => {
    console.log("Erro na requisição")
  })
}

async function doFetchAsync() {
  const res = await fetch("https://api.github.com/users/raphael-rabadan")
  const json = await res.json()
  showData2(json)
}

function showData(data) {
  const userDiv = document.querySelector("#user")
  userDiv.textContent = `${data.login} - ${data.name}`
}

function showData2(data) {
  const userDiv = document.querySelector("#user2")
  userDiv.textContent = `${data.login} - ${data.name}`
}

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject("Não é possível dividir por 0")
    } else {
      resolve(a / b)
    }
  })
}

function executeDivisionPromise() {
  divisionPromise(12, 0).then(result => {
    console.log(result)
  }).catch(error => {
    console.log("Falha na divisão " + error)
  })
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division)

}