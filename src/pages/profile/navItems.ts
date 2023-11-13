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
    title: "О себе",
    selected: false,
    target: "about",
  },
]
