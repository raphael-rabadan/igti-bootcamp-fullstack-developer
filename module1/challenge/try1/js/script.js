'use strict'

let gUsers = null
let gBtnSearch = null
let gInputSearch = null 
let gLabelCountUsers = null
let gTabUsers = null
let gCountWomen = 0
let gCountMen = 0
let gSumAge = 0
let gAvgAge = 0

window.addEventListener("load", () => {
  loadGlobalVariables()
  loadUsersJson()
})

function loadGlobalVariables() {
  gUsers = []
  gBtnSearch = document.querySelector("#btnSearch")
  gInputSearch = document.querySelector("#inputSearch")
  gLabelCountUsers = document.querySelector("#labelCountUsers")
  gTabUsers = document.querySelector("#tabUsers")
  gCountWomen = document.querySelector("#countWomen")
  gCountMen = document.querySelector("#countMen")
  gSumAge = document.querySelector("#sumAge")
  gAvgAge = document.querySelector("#avgAge")
}

async function loadUsersJson() {
  let result = await fetch("http://localhost:3001/users")
  let users = await result.json()
  
  minifyUsers()
  showUsersAndStatisctics()

  function showUsersAndStatisctics() {
    gBtnSearch.addEventListener("click", (event) => searchUsers(gInputSearch.value.trim()))

    gInputSearch.addEventListener('keyup', (event) => {
      if (event.key == "Enter") {
        searchUsers(event.target.value.trim())
      }
    })
  }

  function searchUsers(textTypedToSearch) {
    if (textTypedToSearch.trim() === "") {
      return;
    }
    let usersFound = gUsers.filter(user => user.name.toLocaleUpperCase().includes(textTypedToSearch.toLocaleUpperCase()))
    showUsers()
    showStatistics()

    function showStatistics() {
      let sumAge = usersFound.reduce((acc, crr) => acc + parseInt(crr.age), 0)
      gSumAge.textContent = sumAge
      gAvgAge.textContent = new Intl.NumberFormat('pt-BR', { minimumFractionDigits:2, maximumFractionDigits:2 }).format(sumAge/usersFound.length)
      
      gCountMen.textContent = usersFound.filter(user =>  user.gender.trim().toLocaleLowerCase() === "male" ).length
      gCountWomen.textContent = usersFound.filter(user =>  user.gender.trim().toLocaleLowerCase() === "female" ).length
    }
    function showUsers() {
      let textLabelCountUsers = "No users found"
      let usersHTML = ""
      if (usersFound.length > 0) {
        usersFound.sort((a, b) => a.name.localeCompare(b.name))
        usersHTML = "</div>"
        textLabelCountUsers = `${usersFound.length} User(s) found`
        usersFound.forEach(user => {
          const { name, picture, age } = user
          let userHTML = `<div class="user">
            <div><div>
              <img src="${picture}" alt="${name}" />
              ${name}, ${age} years
              </div></div>
          </div>`
          usersHTML += userHTML
        })
        usersHTML += "</div>"
      }
      gTabUsers.innerHTML = usersHTML
      gLabelCountUsers.textContent = textLabelCountUsers
    }
  }

  function minifyUsers() {
    gUsers = users.map(user => {
      const { gender, name, picture, dob } = user
      return {
        name: `${name.first} ${name.last} `,
        picture: picture.thumbnail,
        age: dob.age,
        gender
      }
    })
  }
}