export type FilterItem = {
  value: string
  title: string
}

export enum Country {
  Russia = "Россия",
  Belarus = "Беларусь",
  Poland = "Польша",
  Kaz = "Казахстан",
  UZB = "Узбекистан",
}

export const countryItems: Array<FilterItem> = [
  {
    value: "Russia",
    title: "Россия",
  },
  {
    value: "Belarus",
    title: "Беларусь",
  },
  {
    value: "Poland",
    title: "Польша",
  },
  {
    value: "Kaz",
    title: "Казахстан",
  },
  {
    value: "Armenia",
    title: "Узбекистан",
  },
]
