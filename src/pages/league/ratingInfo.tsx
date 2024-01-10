import League from "@/models/League"
import React from "react"

type Props = {
  rating?: string
  count?: string
}

const RatingInfo = ({ rating, count }: Props) => {
  return (
    <div className="hidden w-1/2 justify-end md:block">
      <div className="flex items-center justify-end gap-8">
        <div className="mt-1 flex gap-3">
          <div className="text-4xl font-black text-secondary-500">{rating}</div>
          <div className="text-sm font-semibold">
            Средний
            <br />
            рейтинг
          </div>
        </div>
        <div className="mt-1 flex justify-end gap-3">
          <div className="text-4xl font-black">{count}</div>
          <div className="text-sm font-semibold">
            Количество
            <br />
            участников
          </div>
        </div>
      </div>
      <div className="mt-[24px]  h-[1px] w-full bg-gray-80 "></div>
    </div>
  )
}

export default RatingInfo
