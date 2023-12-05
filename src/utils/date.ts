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

export const todayIsBirthdate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  console.log(date)
  if (date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
    return true
  }
  return false
}

export const getDaysInCurrentMonth = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1 // Месяцы в JavaScript начинаются с 0

  // Получаем последний день текущего месяца
  const lastDayOfMonth = new Date(year, month, 0)

  // Возвращаем день месяца, который представляет собой количество дней в текущем месяце
  return lastDayOfMonth.getDate()
}

export const createArrayWithDays = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1 // Месяцы в JavaScript начинаются с 0

  // Получаем последний день текущего месяца
  const lastDayOfMonth = new Date(year, month, 0)
  const numberOfDaysInMonth = lastDayOfMonth.getDate()

  // Создаем массив, где каждый элемент представляет собой объект Date с соответствующей датой
  const arrayWithDates = Array.from(
    { length: numberOfDaysInMonth },
    (_, index) => {
      const day = index + 1
      return new Date(year, month - 1, day) // Месяцы в объекте Date начинаются с 0
    }
  )

  return arrayWithDates
}
