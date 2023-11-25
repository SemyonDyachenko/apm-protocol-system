export const getNormalizeDate = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return formattedDate.toString()
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // добавляем ведущий ноль, если месяц меньше 10
  const day = String(date.getDate()).padStart(2, "0") // добавляем ведущий ноль, если день меньше 10

  return `${year}-${month}-${day}`
}

export const getNormalizeDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
  })
  const formattedTime = date.toLocaleTimeString("ru-RU", { timeStyle: "short" })
  return formattedDate.toString() + " " + formattedTime.toString()
}
