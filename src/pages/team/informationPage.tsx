import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { getCompetitorFullname } from "@/models/Competitor"
import Team from "@/models/Team"
import { competitorAPI } from "@/services/competitorService"
import { Link } from "react-router-dom"

type Props = {
  team: Team
}

const items: Array<upMenuItem> = [
  {
    title: "Основная информация",
    target: "info",
    selected: true,
  },
]

const TeamInformationPage = ({ team }: Props) => {
  const { data: competitor } = competitorAPI.useFetchCompetitorDataQuery(
    team.organizer
  )

  return (
    <div>
      <div>
        <UpMenuBar items={items} />
      </div>
      <div>
        <div className="py-4">
          {/* description */}
          <p className="pt-1 text-sm font-medium text-gray-700">
            {team.description}
          </p>
        </div>
        <div className="w-full py-4">
          <div className="grid gap-y-12 md:grid-cols-3">
            <div>
              <p className="py-1 text-sm text-gray-400">Организатор:</p>
              <div className="text-sm">
                <Link
                  className="text-secondary-500 underline transition hover:text-secondary-400"
                  to={`/competitor/${team.organizer}`}
                >
                  {getCompetitorFullname(competitor)}
                </Link>
              </div>
            </div>
            <div>
              <p className="py-1 text-sm text-gray-400">Страна:</p>
              <div className="text-sm">{team.country}</div>
            </div>
            <div>
              <p className="py-1 text-sm text-gray-400">Почта:</p>
              <div className="text-sm">{team.email}</div>
            </div>
            <div>
              <p className="py-1 text-sm text-gray-400">Номер телефона:</p>
              <div className="text-sm">{team.phone}</div>
            </div>
            <div>
              <p className="py-1 text-sm text-gray-400">Статус:</p>
              <div className="text-sm">Любительская</div>
            </div>
            <div>
              <p className="py-1 text-sm text-gray-400">Адрес:</p>
              <div className="text-sm">{team.location}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamInformationPage
