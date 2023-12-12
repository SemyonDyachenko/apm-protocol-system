import { faCircleExclamation, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

type Props = {
  active: boolean
  closeFunc: () => void
}

const ErrorModal = ({ active, closeFunc }: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null)

  const applyScroll = () => {
    document.body.style.overflowY = "scroll"
  }

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
      <div className="absolute z-[5] h-full w-full bg-black opacity-30"></div>

      <div
        ref={popupRef}
        className="relative z-[20] h-full w-full rounded-xl bg-white p-4 shadow-md md:h-[200px] md:w-[400px]"
      >
        <motion.div
          initial={{ opacity: 10 }}
          whileInView={{ opacity: 100 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex w-full items-center gap-4 py-4 text-secondary-500">
            <div className="text-5xl">
              <FontAwesomeIcon icon={faCircleExclamation} />
            </div>
            <div className="text-2xl font-medium">Произошла ошибка</div>
          </div>
          <div className="flex w-full justify-center py-2">
            <button
              onClick={closeFunc}
              className="rounded-lg bg-secondary-500 px-6 py-2 font-medium transition hover:bg-secondary-600"
            >
              Закрыть окно
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ErrorModal
