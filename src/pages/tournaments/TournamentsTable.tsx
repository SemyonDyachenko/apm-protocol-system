import League from "@/models/League"
import Tournament from "@/models/Tournament"
import { getNormalizeDate } from "@/utils/date"
import React from "react"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

type Props = {
  tournaments: Tournament[]
  leagues: League[]
  status: boolean
}

const TournamentsTable = ({ tournaments, leagues, status }: Props) => {
  const getLeagueById = (id: number) => {
    function getLeague(league: League) {
      return league.id === id
    }
    return leagues.find(getLeague)
  }

  return (
    <Table striped hover className="mx-auto rounded-lg  bg-white px-10 pb-0">
      <thead>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Организатор</th>
          <th>Дата проведения</th>
          <th>Место проведения</th>
          <th>Подробнее</th>
        </tr>
      </thead>
      <tbody>
        {tournaments &&
          tournaments
            .filter((value: Tournament) => value.is_started === status)
            .map((element, index) => (
              <tr key={index}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{getLeagueById(element.league)?.name}</td>
                <td>{getNormalizeDate(element.date)}</td>
                <td>{element.location}</td>
                <td>
                  <Link
                    className={`${
                      status === true && "bg-green-300"
                    } rounded-2xl bg-primary-400 px-3 py-1 text-sm text-white transition-all hover:bg-primary-200`}
                    to={`/tournaments/${element.id}`}
                  >
                    Смотреть
                  </Link>
                </td>
              </tr>
            ))}
      </tbody>
    </Table>
  )
}

export default TournamentsTable
