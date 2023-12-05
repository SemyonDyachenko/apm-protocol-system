import Tournament from "@/models/Tournament"
import {
  createArrayWithDays,
  getDaysInCurrentMonth,
  getNormalizeDate,
} from "@/utils/date"
import React from "react"
import { Link } from "react-router-dom"

type Props = {
  tournaments: Tournament[]
}

const CalendarView = ({ tournaments }: Props) => {
  return (
    <div>
      <div className="py-4">
        <div className="min-h-[500px] w-full rounded-md bg-gray-200">
          <div className="grid grid-cols-6 gap-4 p-4">
            {createArrayWithDays().map((item, index) => (
              <div className="h-[120px] rounded-md bg-gray-70 p-2">
                <div className="font-medium">
                  {getNormalizeDate(item.toDateString())}
                </div>
                {tournaments
                  .filter(
                    (tournament) =>
                      getNormalizeDate(tournament.date) ===
                      getNormalizeDate(item.toDateString())
                  )
                  .map((tournament, index) => (
                    <div className="mt-2 font-medium text-secondary-500 underline">
                      <Link
                        className="transition hover:text-secondary-400"
                        to={`/tournament/${tournament.id}`}
                      >
                        {tournament.name}
                      </Link>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarView
