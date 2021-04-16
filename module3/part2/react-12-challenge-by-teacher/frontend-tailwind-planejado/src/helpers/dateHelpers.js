const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export function helperFormatDate(year, month, day) {
  return dateFormatter.format(new Date(year, month - 1, day));
}
