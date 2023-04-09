import { tournamentAPI } from "@/services/tournamentsService"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

type Props = {}

const TournamentSystem = (props: Props) => {
  const navigate = useNavigate()
  const { tournamentId } = useParams()
  const { data: tournament } = tournamentAPI.useFetchTournamentQuery(
    parseInt(typeof tournamentId === "string" ? tournamentId : "0")
  )

  useEffect(() => {
    if (!tournament?.is_started || (!tournament && !tournamentId)) {
      navigate(-1)
    }
  }, [tournament?.is_started, navigate])

  if (tournament?.is_started) return <div>TournamentSystem</div>
  else return <div>Page Not Found.</div>
}

export default TournamentSystem
