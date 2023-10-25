import League from "@/models/League"
import React from "react"

type Props = {
  league?: League
}

const RatingInfo = ({ league }: Props) => {
  return (
    <div className="w-1/2 justify-end">
      <div className="flex items-center justify-end gap-8">
        <div className="mt-1 flex gap-3">
          <div className="text-4xl font-black text-secondary-500">1230</div>
          <div className="text-sm font-semibold">
            Средний
            <br />
            рейтинг
          </div>
        </div>
        <div className="mt-1 flex justify-end gap-3">
          <div className="text-4xl font-black">63</div>
          <div className="text-sm font-semibold">
            Количество
            <br />
            участников
          </div>
        </div>
      </div>
      <div className="my-[24px] h-[1px] w-full bg-gray-80"></div>
    </div>
  )
}

export default RatingInfo
