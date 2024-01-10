import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import Checkbox from "../UI/Checkbox"
import { Link } from "react-router-dom"
import { applyScroll } from "@/utils/func"

type Props = {
  active: boolean
  closeFunc: () => void
  text: string
  action: () => void
  children?: React.ReactNode
  disabledButton?: boolean
}

const ConfirmModal = ({
  active,
  closeFunc,
  text,
  action,
  children,
  disabledButton,
}: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.body.style.overflowY = active ? "hidden" : "scrollY"

    const handleClickOutside = (event: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as HTMLElement)
      ) {
        closeFunc()
        applyScroll()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })
  return (
    <div
      className={`${
        !active && "hidden"
      } absolute top-0 left-0 flex h-screen w-screen items-center justify-center`}
    >
      <div className="absolute z-[5] h-[3000px] w-full bg-black opacity-30"></div>
      <motion.div
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ delay: 0.1 }}
      >
        <div
          ref={popupRef}
          className="relative z-[20] flex  h-full w-full flex-wrap justify-center rounded-xl bg-white p-4 shadow-md md:h-auto md:w-[500px]"
        >
          <div className="flex w-full items-center justify-center gap-4 py-2 text-gray-700">
            <div className="text-xl font-medium">{text}</div>
          </div>
          {children}
          <div className="flex w-full justify-end gap-2 pt-4">
            <div>
              <button
                disabled={disabledButton}
                className="rounded-lg bg-secondary-500 px-8 py-2 font-medium transition hover:bg-secondary-600 disabled:opacity-50"
                onClick={() => {
                  applyScroll()
                  action()
                }}
              >
                Да
              </button>
            </div>
            <button
              onClick={() => {
                applyScroll()
                closeFunc()
              }}
              className="rounded-lg bg-gray-400 px-8 py-2 font-medium text-white transition hover:bg-primary-400"
            >
              Нет
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ConfirmModal
