import { Link, useLocation } from "react-router-dom"
import { SocialIcon } from "react-social-icons"

type Props = {}

const navLinks = [
  {
    path: "/",
    title: "Главная",
  },
  {
    path: "/rating",
    title: "Список участников",
  },
  {
    path: "/tournaments",
    title: "Турниры",
  },
  {
    path: "/leagues",
    title: "Лиги",
  },
]

const Navbar = (props: Props) => {
  const location = useLocation()

  return (
    <nav className="w-full bg-gray-700">
      <div className="flex items-center justify-between py-4 px-10">
        <div>
          <img src="https://static.tildacdn.com/tild3164-3739-4534-b466-346531666636/_.png" />
        </div>
        <div className="flex gap-2 text-xl text-white">
          <div>
            <SocialIcon url="https://twitter.com/jaketrent" />
          </div>
          <div>
            <SocialIcon url="https://instagram.com" />
          </div>
          <div>
            <SocialIcon url="https://vk.com" />
          </div>
          <div>
            <SocialIcon url="https://youtube.com" />
          </div>
        </div>
      </div>
      <div className="flex w-full border-t-4 border-primary-400 py-2">
        <div className="flex w-3/5 items-center justify-center gap-8 text-lg text-white">
          {navLinks.map((element, index) => (
            <Link key={`${element}+${index}`} to={element.path}>
              <div
                className={`${
                  element.path === location.pathname && "text-secondary-400"
                }`}
                key={index}
              >
                {element.title}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex w-2/5 justify-center gap-3">
          <Link to="/login">
            <div className="text-md transit rounded-lg bg-secondary-400 px-10 py-2 font-bold text-white transition hover:bg-primary-400">
              ВОЙТИ
            </div>
          </Link>

          <Link to="/signup">
            <div className="text-md transit rounded-lg bg-secondary-400 px-10 py-2 font-bold text-white transition hover:bg-primary-400">
              РЕГИСТРАЦИЯ
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
