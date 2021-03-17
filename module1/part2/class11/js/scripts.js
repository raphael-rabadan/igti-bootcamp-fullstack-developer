'use strict'

window.addEventListener("load", () => {
  console.clear()
  console.log(people)
  doMap()
  doFilter()
  doForEach()
  doReduce()
  doFind()
  doSome()
  doEvery()
  doSort()
})

function doMap() {
  const nameEmailArray = people.results.map(person => {
    return {
      name: person.name,
      email: person.email
    }
  })
  console.log(nameEmailArray)
  return nameEmailArray
}

function doFilter() {
  const olderThan50 = people.results.filter(person => {
    return person.dob.age > 50
  })
  console.log(olderThan50)  
}

function doForEach() {
  const mappedPeople = doMap()

  mappedPeople.forEach(person => {
    person.name.size = person.name.title.length + person.name.first.length + person.name.last.length
  })
  console.log(mappedPeople)
}

function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age
  }, 0)
  console.log(totalAges)

  let sumAges = 0;
  for (let i = 0 ; i < people.results.length ; i++) {
    sumAges += people.results[i].dob.age
  }

  console.log(sumAges)
}

function doFind() {
  let primeiroMg = people.results.find(person => person.location.state === "Minas Gerais")

  primeiroMg = people.results.find(person => {
    return person.location.state === "Minas Gerais"
  })

  console.log(primeiroMg)
}

function doSome() {
  let existe = people.results.some(person => person.location.state === "Amazonas")
  console.log(existe)
  
  existe = people.results.some(person => {
    return person.location.state === "Amazonas"
  })

  console.log(existe)
}

function doEvery() {
  let every = people.results.every(person => person.nat === 'BR')
  console.log(every)  
  every = people.results.every(person => {
    return person.nat === 'BR'
  })  
  console.log(every)
}

function doSort() {
  const mappedNames = people.results
  .map(person => {
    return {
      name: person.name.first
    }
  })
  .filter(person => person.name.toUpperCase().startsWith("A"))
  .sort((a, b) => {
    //return a.name.localeCompare(b.name)
    return a.name.length > b.name.length ? 1 : a.name.length < b.name.length ? -1 : 0
    //return (a.name.length - b.name.length)
    
  })
  console.log(mappedNames)
}