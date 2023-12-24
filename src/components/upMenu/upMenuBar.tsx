import {
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useEffect } from "react"

export type upMenuItem = {
  selected: boolean
  title: string
  target?: string
}

type Props = {
  items: Array<upMenuItem>
  changeTarget?: (target: any) => void
}

const UpMenuBar = ({ items, changeTarget }: Props) => {
  const handleChangeTarget = (value: any) => {
    if (changeTarget) changeTarget(value)
  }

  const selectElement = (element: upMenuItem) => {
    items.forEach((element) => {
      if (element.selected) element.selected = false
    })
    element.selected = true
  }

  const setNextItem = () => {
    const index = items.findIndex((item) => item.selected)
    if (index !== items.length - 1) {
      selectElement(items[index + 1])
      handleChangeTarget(items[index + 1].target)
    }
  }

  const setPreviousItem = () => {
    const index = items.findIndex((item) => item.selected)
    if (index !== 0) {
      selectElement(items[index - 1])
      handleChangeTarget(items[index - 1].target)
    }
  }

  useEffect(() => {
    selectElement(items[0])
  }, [])

  return (
    <div className="max-w-full">
      <div className="hidden items-center gap-3 md:flex md:overflow-y-hidden">
        {items.map((element, index) => (
          <div key={index} className="py-3">
            <button
              onClick={() => {
                handleChangeTarget(element.target)
                selectElement(element)
              }}
              className={`${
                element.selected
                  ? " border-secondary-400 text-secondary-400"
                  : "border-gray-400 text-gray-400"
              } text-md ${
                index !== 0 && "hidden md:block"
              } rounded-[6px] border-[1px] px-3 py-[5px] font-[300] transition hover:border-secondary-500 hover:text-secondary-500
                    `}
            >
              {element.title}
            </button>
          </div>
        ))}
      </div>
      <div className="w-full md:hidden">
        <div className="flex w-full items-center justify-between py-3">
          {items.length > 1 && (
            <div>
              <FontAwesomeIcon
                onClick={setPreviousItem}
                className="text-xl font-medium text-secondary-500"
                icon={faChevronLeft}
              />
            </div>
          )}
          <div>
            <button
              className={`
                
                   text-md rounded-[6px]
            
               border-[1px]  border-secondary-400 px-3 py-[5px] font-[300] text-secondary-400 transition hover:border-secondary-500 hover:text-secondary-500
                    `}
            >
              {items.find((item) => item.selected)?.title}
            </button>
          </div>
          {items.length > 1 && (
            <div>
              <FontAwesomeIcon
                onClick={setNextItem}
                className="text-xl font-medium text-secondary-500"
                icon={faChevronRight}
              />
            </div>
          )}
        </div>
      </div>
      <div className="h-[0.5px] w-full bg-gray-80"></div>
    </div>
  )
}

export default UpMenuBar
