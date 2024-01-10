export const roles = [
  {
    title: "Спортсмен",
    value: "competitor",
  },
  {
    title: "Секретарь",
    value: "secretary",
  },
  {
    title: "Судья",
    value: "judge",
  },
  {
    title: "Организатор",
    value: "organizer",
  },
]

export const applyScroll = () => {
  document.body.style.overflowY = "scroll"
}

export const getRoleTitle = (role: string) => {
  return roles.find((item) => item.value === role)?.title
}
