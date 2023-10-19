import React from "react"

type Props = {
  active: boolean
}

const LangSwitch = ({ active }: Props) => {
  return (
    <div className={`${!active && "hidden"} absolute -translate-x-[30%]`}>
      <div className="flex w-[100px] flex-wrap items-center gap-2 rounded-lg bg-gray-700  py-2 font-semibold text-white shadow-lg">
        <div className="flex w-[100px] cursor-pointer justify-center py-1 transition  hover:bg-gray-200 hover:bg-opacity-50">
          RUS
        </div>
        <div className="flex w-[100px] cursor-pointer justify-center py-1 transition  hover:bg-gray-200 hover:bg-opacity-50">
          ENG
        </div>
      </div>
    </div>
  )
}

export default LangSwitch
