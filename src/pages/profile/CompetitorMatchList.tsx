import { matchAPI } from "@/services/matchService"

type Props = {
  competitorId: number
}

const CompetitorMatchList = ({ competitorId }: Props) => {
  const { data: matches } =
    matchAPI.useFetchCompetitorMatchesQuery(competitorId)
  return (
    <div>
      {matches && (
        <div>
          {matches.map((element, index) => (
            <div className="mb-2 flex items-center justify-between rounded-lg bg-gray-400 px-10 py-4">
              <div className="flex w-full items-center  justify-between  text-lg text-white">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-secondary-400 px-4 py-2">
                    1000
                  </div>{" "}
                  Semyon Dyachenko{" "}
                </div>
                <div className="font-bold">VS</div>
                <div className="flex items-center gap-4">
                  Valentin Morozov
                  <div className="rounded-full bg-secondary-400 px-4 py-2">
                    1000
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CompetitorMatchList
