import { TournamentWeightClass, WeightClassData } from "@/models/WeightClass"

export const getWeightCategoriesFromString = (
  value: string
): Array<WeightClassData> | null => {
  if (value) {
    let array = value.split(",")
    const uniqueSet = new Set<string>()

    const resultArray = array.map((item) => {
      const trimmedItem = item.trim()
      if (trimmedItem !== "") {
        uniqueSet.add(trimmedItem)
      }
      return { name: isNaN(parseInt(trimmedItem)) ? trimmedItem : "" }
    })
    const uniqueArray = Array.from(uniqueSet)
    return uniqueArray.map((item) => ({ name: item }))
  }

  return null
}

export const getStringFromWeightCategiores = (
  classes: TournamentWeightClass[] | undefined,
  category: string
) => {
  if (classes)
    if (classes.length > 0) {
      let array = classes.filter((item) => item.category === category)
      let newArray = array.map((item) => {
        return item.weight_class.name
      })
      return newArray.join(",")
    }
  return ""
}
