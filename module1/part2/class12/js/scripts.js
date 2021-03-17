'use strict'

window.addEventListener("load", () => { 
  console.clear()
  console.log(people)
  doSpread()
  doRest()
  doDestructuring()
})

function doSpread() {
  const marriedMen = people.results.filter(person => person.name.title === "Mr")
  const marriedWomen = people.results.filter(person => person.name.title === "Ms")
  const marriedPeople = [...marriedMen, ...marriedWomen, {msg: "oi"}]
  console.log(marriedMen)
  console.log(marriedWomen)
  console.log(marriedPeople)
}

function doRest() {
  console.log(infiniteSum(1, 2, 100, 300, 400))
}

function infiniteSum(...numbers){
  console.log(numbers)
  return numbers.reduce((accumulator, current) => accumulator += current)
}

function doDestructuring() {
  const first = people.results[0];
  
  // const username = first.login.username
  // const password = first.login.password

  //console.log(username)
  //console.log(password)

  const {username, password} = first.login

  console.log(username)
  console.log(password)
}