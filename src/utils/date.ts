export const getNormalizeDate = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return formattedDate.toString()
}
