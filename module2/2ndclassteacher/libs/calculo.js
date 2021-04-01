function soma(array) {
  const sum = array.reduce((acc, cur) => {
    return (acc += cur)
  })
  return sum
}

function media(array) {
  return soma(array) / array.length
}

export default { soma, media }
