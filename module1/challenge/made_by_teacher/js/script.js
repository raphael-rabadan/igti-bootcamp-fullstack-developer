'use strict'

let allUsers = []
let filteredUsers = []

const inputSearch = document.querySelector("#inputSearch")
const buttonSearch = document.querySelector("#buttonSearch")
const MINIMUM_ALLOWED_INPUT_SIZE = 1
const enabledButtonClass = "bg-green-500"
const form = document.querySelector("#form")
const divStatistics = document.querySelector("#divStatistics")
const divUsers = document.querySelector("#divUsers")

async function start() {
  await readUsersFromBackend()
  enableControls()
  enableEvents()
}

async function readUsersFromBackend() {
  const resource = await fetch("http://localhost:3001/users")
  const json = await resource.json()

  allUsers = json.map(({login, name, dob, picture, gender}) => {
    const fullName = `${name.first} ${name.last}`
    const searchName = fullName.toLocaleLowerCase()
    return {
      id: login.uuid,
      name: fullName,
      age: dob.age,
      gender: gender,
      picture: picture.medium,
      searchName
    }
  })

  filteredUsers = [...filteredUsers]
}

function enableControls() {
  inputSearch.disabled = false
  inputSearch.focus()
}

function enableEvents() {
  inputSearch.addEventListener('input', ({currentTarget}) => {
    const shouldEnable = currentTarget.value.length >= MINIMUM_ALLOWED_INPUT_SIZE
    buttonSearch.disabled = !shouldEnable

    shouldEnable ? buttonSearch.classList.add(enabledButtonClass) : buttonSearch.classList.remove(enabledButtonClass)
    
    // if (shouldEnable) {
    //   buttonSearch.classList.add(enabledButtonClass)      
    // } else {
    //   buttonSearch.classList.remove(enabledButtonClass)  
    // }
  })

  form.addEventListener('submit', event => {
    event.preventDefault()

    const searchTerm = inputSearch.value
    doFilterUsers(searchTerm)
  })

  function doFilterUsers(searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLocaleLowerCase()
    filteredUsers = allUsers
    .filter(user => user.searchName.includes(lowerCaseSearchTerm))
    .sort((a, b) => a.name.localeCompare(b.name))

    render()
  }

  function render() {
    renderStatistics()
    renderUsers()
  }

  function renderStatistics() {
    if (filteredUsers.length === 0) {
      divStatistics.textContent = "Nada a ser exibido."
      return;
    }

    const maleUsers = filteredUsers.filter(({gender}) => gender === "male").length
    const femaleUsers = filteredUsers.filter(({gender}) => gender === "female").length

    const sumAges = filteredUsers.reduce((acc, {age}) => acc + age, 0)
    const avgAges = (sumAges / filteredUsers.length)
      .toFixed(2)
      .replace(".", ",")

    divStatistics.innerHTML = `
      <h2 class="margin-auto text-center text-xl font-semibold mb-2">
        Estatísticas
      </h2>
      <ul>
        <li>Sexo masculino: <strong>${maleUsers}</strong></li>
        <li>Sexo feminino: <strong>${femaleUsers}</strong></li>
        <li>Soma das idades: <strong>${sumAges}</strong></li>
        <li>Média das idades: <strong>${avgAges}</strong></li>
      <ul> `
  }

  function renderUsers() {
    if (filteredUsers.length === 0) {
      divUsers.textContent = "Nenhum usuário encontrado com esse filtro."
      return;
    }

    divUsers.innerHTML = `
      <h2 class="margin-auto text-center text-xl font-semibold mb-2">
        ${filteredUsers.length} usuários(s) encontrado(s)
      </h2>
      <ul>
        ${filteredUsers
          .map(user => {
          return `
            <li class="flex flex-row items-center mb-2 space-x-4">
              <img class="rounded-full" src="${user.picture}" alt="${user.name} title="${user.name}"></img>
              <span>${user.name}, ${user.age} anos</span>
            </li>
          `
        }).join('')}
      </ul>
    `
  }
}

start()