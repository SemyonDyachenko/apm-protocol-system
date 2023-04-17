import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import Tournament, { TournamentRegistration } from "@/models/Tournament"
import { tournamentAPI } from "@/services/tournamentsService"
import { findCompetitorById } from "@/utils/dataUtils"
import { useEffect, useState } from "react"

type Props = {
  tournament: Tournament
  competitors: Competitor[]
  tournamentRegistrations?: TournamentRegistration[]
}

const TournamentCompetitorsList = ({
  tournament,
  competitors,
  tournamentRegistrations,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(tournamentRegistrations)

  useEffect(() => {
    const results = tournamentRegistrations?.filter((item) =>
      findCompetitorById(competitors, item.competitor)
        ?.last_name.toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    setFilteredData(results)
  }, [searchTerm, tournamentRegistrations])

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <div className="w-full rounded-xl bg-gray-200 p-4 shadow-xl">
        <div>
          <div>
            <input
              type="text"
              className="mb-2 w-full rounded-lg px-4 py-2 shadow-sm outline-none"
              placeholder="Поиск"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {filteredData?.map((element, index) => (
          <div
            key={index}
            className="my-2 flex w-full justify-between rounded-lg bg-white py-2 px-4 text-gray-700 shadow-sm"
          >
            <div>
              {getCompetitorFullname(
                findCompetitorById(competitors, element.competitor)
              )}
            </div>

            <div className="flex justify-between gap-4">
              <div className="right text-sm text-gray-400">
                Rating:
                {
                  findCompetitorById(competitors, element.competitor)
                    ?.elo_rating
                }
              </div>
              <div>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TournamentCompetitorsList
