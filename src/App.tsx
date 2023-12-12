import "bootstrap/dist/css/bootstrap.min.css"
import {
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
  useLocation,
} from "react-router-dom"

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

import CompetitorCardPage from "./pages/competitorCard"
import LeaguePage from "./pages/league"
import StartPage from "./pages/landing"
import PageNotFound from "./pages/404/PageNotFound"
import LeagueEditingPage from "./pages/leagueEditing"

const isAuth = localStorage.getItem("token")
import { Routes, Route, Outlet } from "react-router-dom"
import PasswordRestorePage from "./pages/passwordRestore"
import FeedbackPage from "./pages/feedbackPage"
import TournamentEditingPage from "./pages/tournamentEditing"
import TeamPage from "./pages/team"
import TeamEditingPage from "./pages/teamEditing"
import TestSystem from "./pages/tournamentSystem"

function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/" element={<NavbarWrapper />}>
            <Route index element={<StartPage />} />
            <Route
              path="login"
              element={isAuth ? <PageNotFound /> : <LoginPage />}
            />
            <Route path="rating" element={<RatingList />} />
            <Route path="leagues" element={<LeagueList />} />
            <Route
              path="signup"
              element={isAuth ? <PageNotFound /> : <SignupPage />}
            />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="tournaments" element={<TournamentsPage />} />
            <Route
              path="tournaments/:tournamentId"
              element={<TournamentPage />}
            />
            <Route
              path="tournaments/editing/:tournamentId"
              element={<TournamentEditingPage />}
            />
            <Route path="match" element={<MatchPage />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route
              path="competitor/:competitorId"
              element={<CompetitorCardPage />}
            />
            <Route path="league/:leagueId" element={<LeaguePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="league/editing/:leagueId"
              element={<LeagueEditingPage />}
            />
            <Route path="password-restore" element={<PasswordRestorePage />} />
            <Route path="contact" element={<FeedbackPage />} />
            <Route path="team/:teamId" element={<TeamPage />} />
            <Route path="team/editing/:teamId" element={<TeamEditingPage />} />
            <Route path="system" element={<TestSystem />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
