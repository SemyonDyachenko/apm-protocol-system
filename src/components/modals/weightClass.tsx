import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import ActionButton from "../UI/Button"
import WeightClass from "@/models/WeightClass"

type Props = {
  visible: boolean
  closeFunc: () => void
}

const WeightClassCreation = ({ visible, closeFunc }: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null)
  const [stack, setStack] = useState<Array<string>>([])
  const [categoryInput, setCategoryInput] = useState("")

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as HTMLElement)
      ) {
        closeFunc()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  const pushToStack = () => {
    if (categoryInput) {
      if (!stack.includes(categoryInput))
        setStack((prev) => [categoryInput, ...prev])
    }
  }

  return (
    <div
      className={`${
        !visible && "hidden"
      } absolute top-0 left-0 flex h-screen w-screen items-center justify-center`}
    >
      <div className="absolute z-[5] h-full w-full bg-black opacity-30"></div>

      <div
        ref={popupRef}
        className="relative z-[20] h-full w-full rounded-xl bg-white p-4 shadow-md md:h-auto md:w-[400px]"
      >
        <motion.div
          initial={{ opacity: 10 }}
          whileInView={{ opacity: 100 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-full pb-2 text-center">
            <div className="w-full justify-center text-xl font-medium">
              Создание весовой категории
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-400">Добавленные:</span>
            <div className="flex">
              {stack.reverse().map((item, index) => (
                <div className="text-sm text-gray-400" key={index}>
                  {item}
                  {index !== stack.length - 1 && ","}
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-400 ">Весовая категория:</span>
            <input
              type="number"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              max={110}
              className="w-full rounded-lg bg-gray-200 px-4 py-2 outline-none"
              placeholder="Пример: 85,95,..."
            />
          </div>
          <div className="mt-3 flex w-full justify-end gap-2">
            <ActionButton onClick={pushToStack}>Создать</ActionButton>
            <ActionButton onClick={closeFunc} className="text-white" gray>
              Закрыть
            </ActionButton>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WeightClassCreation
