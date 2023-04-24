import Competitor from "@/models/Competitor"
import Match from "@/models/Match"
import getUnicodeFlagIcon from "country-flag-icons/unicode"

type Props = {
  matches: Match[]
  competitor: Competitor
}

const MatchesList = ({ competitor, matches }: Props) => {
  if (matches)
    return (
      <div className="pr-4">
        {matches.map((element, index) => (
          <div className="my-2 w-full rounded-lg bg-primary-400 shadow-md">
            <div className="flex items-center justify-center border-b-4 py-1 text-lg font-bold text-white">
              Победа
            </div>
            <div className="flex items-center justify-between py-4 px-5">
              <div className="text-white">
                <div className="py-2 text-lg font-bold">Семен Дьяченко</div>
                <div className="text-sm">
                  {getUnicodeFlagIcon("RU")} {competitor.country}
                </div>
              </div>
              <div className="text-3xl font-bold text-white">VS</div>
              <div className="text-lg font-bold text-white">Артур Пирожков</div>
            </div>
          </div>
        ))}
      </div>
    )
  else return <div></div>
}

export default MatchesList
