import Main from "./pages/main"
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import ControlPanel from "./pages/control"
import Navbar from "./components/navbar"
import LoginPage from "./pages/login"
import RatingList from "./pages/rating"
import LeagueList from "./pages/leagues"
import SignupPage from "./pages/signup"
import Footer from "./components/footer"
import ProfilePage from "./pages/profile"
import TournamentsPage from "./pages/tournaments"
import TournamentPage from "./pages/tournament"
import MatchPage from "./pages/match"
import TournamentSystem from "./pages/tournamentSystem"
import LogoutPage from "./pages/logout"
import { useEffect } from "react"
import CompetitorCardPage from "./pages/competitorCard"
import LeaguePage from "./pages/league"

function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <RatingList />,
      },
      {
        path: "/leagues",
        element: <LeagueList />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "tournaments",
        element: <TournamentsPage />,
      },
      {
        path: "tournaments/:tournamentId",
        element: <TournamentPage />,
      },
      {
        path: "tournaments/system/:tournamentId",
        element: <TournamentSystem />,
      },
      {
        path: "match/",
        element: <MatchPage />,
      },
      {
        path: "logout/",
        element: <LogoutPage />,
      },
      {
        path: "competitor/:competitorId",
        element: <CompetitorCardPage />,
      },
      {
        path: "league/:leagueId",
        element: <LeaguePage />,
      },
    ],
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Footer />
    </div>
  )
}

export default App
