import { upMenuItem } from "@/components/upMenu/upMenuBar"

export const profileSettingsItems: Array<upMenuItem> = [
  {
    title: "Основная информация",
    selected: true,
    target: "general",
  },
  {
    title: "Безопасность",
    selected: false,
    target: "security",
  },

  {
    title: "Уведомления",
    selected: false,
    target: "notification",
  },
  {
    title: "Характеристики",
    selected: false,
    target: "stats",
  },
  {
    title: "О себе",
    selected: false,
    target: "about",
  },
]

export const messagesNavItems: Array<upMenuItem> = [
  {
    title: "Уведомления",
    selected: true,
    target: "notification",
  },
  {
    title: "Личные сообщения",
    selected: false,
    target: "messanger",
  },
  {
    title: "Турниры",
    selected: false,
    target: "tournaments",
  },
]

export const leaguesNavItems: Array<upMenuItem> = [
  {
    title: "Участник",
    selected: true,
    target: "competitor",
  },
  {
    title: "Создатель",
    selected: false,
    target: "founder",
  },
]
