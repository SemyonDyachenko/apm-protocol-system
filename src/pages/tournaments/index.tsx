import HText from "@/components/UI/HText"
import { tournamentAPI } from "@/services/tournamentsService"
import TournamentsTable from "./TournamentsTable"
import { leagueAPI } from "@/services/leaugeService"
import TournamentCreateForm from "./createForm"

type Props = {}

const TournamentsPage = (props: Props) => {
  const { data: tournaments } = tournamentAPI.useFetchAllTournamentsQuery(10)
  const { data: leagues } = leagueAPI.useFetchAllLeaguesQuery(100)
  return (
    <div className="p-5">
      <div className="mx-auto">
        <section id="old w-full">
          <div className="flex justify-between">
            <div className="pb-4">
              <HText>Список всех турниров</HText>
            </div>
          </div>
          <details className="rounded-xl bg-secondary-400 ">
            <summary className="rounded-lg bg-secondary-400 px-10 py-2 text-lg text-white ">
              Раскрыть список
            </summary>
            <div id="table" className="p-2">
              {tournaments && leagues && (
                <TournamentsTable
                  status={false}
                  leagues={leagues}
                  tournaments={tournaments}
                />
              )}
            </div>
          </details>
        </section>

        <section id="new" className="mt-4">
          <div className="pb-4">
            <HText>Список активных турниров</HText>
          </div>
          <details className="rounded-xl bg-secondary-400 ">
            <summary className="rounded-lg bg-secondary-400 px-10 py-2 text-lg text-white ">
              Раскрыть список
            </summary>
            <div id="table" className="p-2">
              {tournaments && leagues && (
                <TournamentsTable
                  status={true}
                  leagues={leagues}
                  tournaments={tournaments}
                />
              )}
            </div>
          </details>
        </section>
        <TournamentCreateForm />
      </div>
    </div>
  )
}

export default TournamentsPage
