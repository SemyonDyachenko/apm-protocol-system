import ActionButton from "@/components/UI/Button"
import { applyScroll, roles } from "@/utils/func"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"

type Props = {
  active: boolean
  closeFunc: () => void
  action: (role: string) => void
}

const LeagueRegisterModal = ({ active, closeFunc, action }: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null)
  const [role, setRole] = useState(roles[0].value)

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
    <div>
      <div
        className={`${
          !active && "hidden"
        } absolute top-0 left-0 flex h-screen w-screen items-center justify-center`}
      >
        <div className="absolute z-[10] h-[3000px] w-full bg-black opacity-30"></div>
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.1 }}
        >
          <div
            ref={popupRef}
            className="relative z-[20] flex  h-screen w-screen flex-wrap justify-center rounded-xl bg-white p-4 shadow-md md:h-auto md:w-[450px]"
          >
            <div
              className="flex w-full cursor-pointer justify-end text-2xl"
              onClick={closeFunc}
            >
              <FontAwesomeIcon icon={faClose} />
            </div>
            <div className="flex-column flex w-full items-center py-2  text-gray-700 md:justify-center">
              <div className="mb-2 text-xl font-medium">
                Заявка на вступление в лигу
              </div>
              <div className="w-full">
                <div className="my-1 text-sm  text-gray-400">Роль:</div>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-lg border-r-8 bg-gray-200 py-2 px-4 font-medium outline-none"
                >
                  {roles.map((item, index) => (
                    <option
                      key={index}
                      className="font-medium"
                      value={item.value}
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 w-full">
                <ActionButton
                  className="w-full font-medium"
                  onClick={() => action(role)}
                >
                  Присоединиться
                </ActionButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LeagueRegisterModal
