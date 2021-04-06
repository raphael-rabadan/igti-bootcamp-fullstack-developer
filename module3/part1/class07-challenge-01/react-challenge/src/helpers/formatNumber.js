export const formatNumber = (number) => {
  return new Intl.NumberFormat("pt-BR").format(number)
}
