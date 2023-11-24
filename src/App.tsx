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

import LogoutPage from "./pages/logout"
import { useEffect } from "react"
import CompetitorCardPage from "./pages/competitorCard"
import LeaguePage from "./pages/league"
import StartPage from "./pages/landing"
import PageNotFound from "./pages/404/PageNotFound"
import LeagueEditingPage from "./pages/leagueEditing"

const isAuth = localStorage.getItem("token")

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
        element: isAuth ? <PageNotFound /> : <LoginPage />,
      },
      {
        path: "/rating",
        element: <RatingList />,
      },
      {
        path: "/",
        element: <StartPage />,
      },
      {
        path: "/leagues",
        element: <LeagueList />,
      },
      {
        path: "/signup",
        element: isAuth ? <PageNotFound /> : <SignupPage />,
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
        path: "tournaments/editing/:tournamentId",
        element: <TournamentPage />,
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
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "league/editing/:leagueId",
        element: <LeagueEditingPage />,
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
