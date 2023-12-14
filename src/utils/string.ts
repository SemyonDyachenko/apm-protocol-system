import { TournamentWeightClass, WeightClassData } from "@/models/WeightClass"

export const getWeightCategoriesFromString = (
  value: string
): Array<WeightClassData> | null => {
  if (value) {
    let array = value.split(",")
    return array.map((item) => {
      return { name: isNaN(parseInt(item.trim())) ? item.trim() : "" }
    })
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
