import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import RatingInfo from "../league/ratingInfo"
import Tournament, { getTournamentLevel } from "@/models/Tournament"
import { Link } from "react-router-dom"
import { getNormalizeDate } from "@/utils/date"
import { leagueAPI } from "@/services/leaugeService"
import { competitorAPI } from "@/services/competitorService"
import League, { getLeagueLevel } from "@/models/League"
import { getCompetitorFullname } from "@/models/Competitor"
import GridItem from "@/components/gridItem"
import { getAvarageRating } from "@/utils/eloCalculation"
import { tournamentAPI } from "@/services/tournamentsService"

type Props = {
  tournament: Tournament
  editing: boolean
  league: League
}

const items: Array<upMenuItem> = [
  {
    title: "Основная информация",
    target: "general",
    selected: true,
  },
]

const TournamentInfoPage = ({ tournament, editing, league }: Props) => {
  const { data: judge } = competitorAPI.useFetchCompetitorDataQuery(
    tournament.main_referee
  )
  const { data: secretary } = competitorAPI.useFetchCompetitorDataQuery(
    tournament.main_secretary
  )
  const { data: competitors } =
    tournamentAPI.useFetchTournamentRegistrationQuery(tournament.id)

  const gridItems = [
    {
      title: "Лига",
      value: (
        <Link
          className="text-secondary-500 underline transition hover:text-secondary-400"
          to={`/league/${tournament.league}`}
        >
          {league?.name}
        </Link>
      ),
    },
    {
      title: "Дата проведения",
      value:
        tournament.date &&
        getNormalizeDate(new Date(tournament.date).toDateString()),
    },

    {
      title: "Город",
      value: tournament.location,
    },
    {
      title: "Телефон",
      value: tournament.phone,
    },
    {
      title: "Статус",
      value: getTournamentLevel(tournament),
    },
    {
      title: "Судья",
      value: (
        <Link
          className="text-secondary-500 underline transition hover:text-secondary-400"
          to={`/competitor/${tournament.main_referee}`}
        >
          {getCompetitorFullname(judge)}
        </Link>
      ),
    },
    {
      title: "Секретарь",
      value: (
        <Link
          className="text-secondary-500 underline transition hover:text-secondary-400"
          to={`/competitor/${tournament.main_secretary}`}
        >
          {getCompetitorFullname(secretary)}
        </Link>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="w-1/2">
          <UpMenuBar items={items} />
        </div>
        {competitors && (
          <RatingInfo
            rating={getAvarageRating(competitors).toString()}
            count={competitors?.length.toString()}
          />
        )}
      </div>
      <div className="flex gap-8">
        {tournament.afisha && (
          <div>
            <img
              className="h-[350px] max-w-[280px] rounded-lg"
              src={tournament.afisha?.toString()}
            />
          </div>
        )}
        <div className="w-full">
          <div>
            <span className="text-sm text-gray-400">Описание:</span>
            <p className="pt-1 text-sm font-medium text-gray-700">
              {tournament.description}
            </p>
          </div>
          <div className="grid w-full grid-cols-4 grid-rows-2 gap-12 py-4">
            {gridItems.map((element, index) => (
              <GridItem
                title={element.title}
                value={element.value}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentInfoPage
