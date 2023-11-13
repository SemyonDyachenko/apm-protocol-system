import { faBuilding, faList, faTable } from "@fortawesome/free-solid-svg-icons"

export type NavLink = {
  path: string
  title: string
  icon: any
  disabled?: boolean
}

export const navLinks: Array<NavLink> = [
  {
    path: "/",
    title: "Главная",
    icon: faTable,
  },
  {
    path: "/rating",
    title: "Рейтинг",
    icon: faTable,
  },
  {
    path: "/tournaments",
    title: "Турниры",
    icon: faList,
  },
  {
    path: "/leagues",
    title: "Лиги",
    icon: faBuilding,
  },
  {
    path: "/news",
    title: "Новости",
    icon: faBuilding,
    disabled: true,
  },
  {
    path: "/streams",
    title: "Трансляции",
    icon: faBuilding,
    disabled: true,
  },
  {
    path: "/trainers",
    title: "Тренировки",
    icon: faBuilding,
    disabled: true,
  },
]
