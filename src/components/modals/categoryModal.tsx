import { faCircleExclamation, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import ActionButton from "../UI/Button"
import UpMenuBar, { upMenuItem } from "../upMenu/upMenuBar"
import { useState } from "react"
import CustomInput from "../UI/Input"
import {
  getStringFromWeightCategiores,
  getWeightCategoriesFromString,
} from "@/utils/string"
import { AppDispatch } from "@/store/store"
import { createTournamentWeightClasses } from "@/store/actions/tournamentAction"
import Tournament from "@/models/Tournament"
import { weightClassAPI } from "@/services/weightClassService"

type Props = {
  active: boolean
  closeFunc: () => void
  children?: React.ReactNode
  dispatch: AppDispatch
  tournament: Tournament
}

const items: Array<upMenuItem> = [
  {
    title: "Мужчины",
    target: "men",
    selected: true,
  },
  {
    title: "Женщины",
    target: "women",
    selected: false,
  },
  {
    title: "Юниоры 21+",
    target: "juniors21",
    selected: false,
  },
  {
    title: "Юниоры 18+",
    target: "juniors18",
    selected: false,
  },
  {
    title: "Ветераны",
    target: "old",
    selected: false,
  },
]

const CategoryModal = ({
  active,
  closeFunc,
  children,
  dispatch,
  tournament,
}: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null)

  const [target, setTarget] = useState("men")

  const { data: weightClasses } = weightClassAPI.useFetchTournamentClassesQuery(
    tournament.id
  )

  const [menCategories, setMenCategoires] = useState("")
  const [womenCategories, setWomenCategoires] = useState("")
  const [oldCategiores, setOldCategiores] = useState("")
  const [juniors18Categiores, setJuniors18Categories] = useState("")
  const [juniors21Categiores, setJuniors21Categories] = useState("")

  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setMenCategoires(getStringFromWeightCategiores(weightClasses, "men"))
    setWomenCategoires(getStringFromWeightCategiores(weightClasses, "women"))
    setOldCategiores(getStringFromWeightCategiores(weightClasses, "old"))
    setJuniors18Categories(
      getStringFromWeightCategiores(weightClasses, "juniors18")
    )
    setJuniors21Categories(
      getStringFromWeightCategiores(weightClasses, "juniors21")
    )
  }, [weightClasses])

  const getInputValue = () => {
    switch (target) {
      case "men":
        return menCategories
        break
      case "women":
        return womenCategories
        break
      case "old":
        return oldCategiores
        break
      case "juniors18":
        return juniors18Categiores
        break
      case "juniors21":
        return juniors21Categiores
        break
      default:
        return menCategories
    }
  }

  const setValue = (value: string) => {
    const pattern = /^[0-9\+,]+$/
    const isValidInput = pattern.test(value)
    setIsValid(isValidInput)

    if (isValid) {
      switch (target) {
        case "men":
          setMenCategoires(value)
          break
        case "women":
          setWomenCategoires(value)
          break
        case "old":
          setOldCategiores(value)
          break
        case "juniors18":
          setJuniors18Categories(value)
          break
        case "juniors21":
          setJuniors21Categories(value)
          break
        default:
          break
      }
    }
  }

  const applyScroll = () => {
    document.body.style.overflowY = "scroll"
  }

  useEffect(() => {
    document.body.style.overflowY = active ? "hidden" : "scrollY"
    document.documentElement.scrollTop = 0

    const handleClickOutside = (event: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as HTMLElement)
      ) {
        applyScroll()
        closeFunc()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  const setTournamentCategoires = () => {
    const weightClasses = {
      men: getWeightCategoriesFromString(menCategories),
      old: getWeightCategoriesFromString(oldCategiores),
      women: getWeightCategoriesFromString(womenCategories),
      juniors18: getWeightCategoriesFromString(juniors18Categiores),
      juniors21: getWeightCategoriesFromString(juniors21Categiores),
    }

    dispatch(createTournamentWeightClasses(tournament.id, weightClasses)).then(
      (res) => {
        if (res) {
          window.location.reload()
        }
      }
    )
  }

  return (
    <div
      className={`${
        !active && "hidden"
      } absolute top-0 left-0 flex h-screen w-screen items-center justify-center`}
    >
      <div className="absolute z-[5] h-full w-full bg-black opacity-30"></div>

      <div
        ref={popupRef}
        className="relative z-[20] h-full w-full rounded-xl bg-white p-4 shadow-md md:h-auto md:w-auto"
      >
        <motion.div
          initial={{ opacity: 10 }}
          whileInView={{ opacity: 100 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.2 }}
        >
          <UpMenuBar changeTarget={setTarget} items={items} />
          <div className="py-2">
            <div className="py-2 text-sm text-gray-400">Весовые категории:</div>

            <CustomInput
              type="text"
              value={getInputValue()}
              onChange={setValue}
              className="w-full py-2 text-lg font-medium text-gray-700"
            />
          </div>
          {children}
          <div className="flex justify-end gap-2 pt-2">
            <div>
              <ActionButton
                className="font-medium"
                onClick={setTournamentCategoires}
              >
                Сохранить
              </ActionButton>
            </div>
            <div>
              <ActionButton
                className="font-medium text-white hover:bg-gray-400"
                gray
                onClick={closeFunc}
              >
                Закрыть
              </ActionButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CategoryModal
