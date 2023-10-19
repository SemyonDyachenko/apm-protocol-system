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

  useEffect(() => {
    selectElement(items[0])
  }, [])

  return (
    <div>
      <div className="flex items-center gap-3">
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
              } text-md rounded-[6px] border-[1px]  px-3 py-[5px] font-[300] transition hover:border-secondary-500 hover:text-secondary-500
                    `}
            >
              {element.title}
            </button>
          </div>
        ))}
      </div>
      <div className="h-[0.5px] w-full bg-gray-100"></div>
    </div>
  )
}

export default UpMenuBar
