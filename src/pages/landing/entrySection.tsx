import { motion } from "framer-motion"

import { Link } from "react-router-dom"

type Props = {}

const EntrySection = (props: Props) => {
  const isAuth = localStorage.getItem("token")

  const outlineButtonStyles =
    "flex items-center justify-center md:text-md text-sm rounded-lg  border-2 border-secondary-500 py-[12px] font-semibold text-secondary-500 transition hover:animate-pulse hover:bg-secondary-500 hover:text-gray-700"
  return (
    <div className="relative flex w-full bg-gray-700">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative z-[10] mx-auto h-auto min-h-screen w-11/12 pt-[160px] pb-[50px] text-white md:px-4">
          <div className="relative w-full md:w-3/5">
            <div className="w-full space-x-2 text-3xl font-bold  leading-tight tracking-wider md:text-6xl">
              <div>
                АРМ-
                <span className="animate-pulse text-secondary-500">РЕЙТ</span> -
                Российская
              </div>
              онлайн
              <span className=" animate-pulse text-secondary-500">
                платформа
              </span>
            </div>
            <div className="text-md w-full py-8 font-semibold tracking-normal md:w-4/5">
              <p className="text-md md:text-xl">
                Добро пожаловать на АРМ-РЕЙТ – ваш путь к спортивной славе!
                Создавайте собственные спортивные лиги, организовывайте
                захватывающие турниры, приглашайте талантливых спортсменов ваших
                событий. Наша инновационная платформа предоставляет уникальные
                протоколы, позволяя вашим турнирам взлететь в мировом рейтинге.{" "}
                <span className="animate-pulse text-secondary-500">
                  Выделитесь, создав свой профиль спортсмена, вступите в
                  спортивные команды, достигните мирового признания в абсолютном
                  рейтинге. Регистрируйтесь на турниры, проявите свое мастерство
                  и станьте частью спортивных лиг, взаимодействуя с активным
                  сообществом. Прокачайте свою игру – с АРМ-РЕЙТ ваш успех
                  неизбежен!
                </span>
              </p>
            </div>
            <div className="my-4">
              <div className="flex w-full justify-between gap-2 md:w-8/12 md:gap-4">
                <Link to="/leagues" className="w-1/2 transition">
                  <div className={outlineButtonStyles}>Лиги</div>
                </Link>

                <Link to="/tournaments" className="w-1/2  transition">
                  <div className={outlineButtonStyles}>Турниры</div>
                </Link>
              </div>
              <div className="py-4">
                <Link to={isAuth ? "/profile" : "/signup"} className="">
                  <div className="flex w-full items-center justify-center rounded-lg border-2 border-secondary-500 bg-secondary-500 py-[16px] text-sm font-semibold text-gray-700 shadow-md transition hover:animate-pulse hover:bg-transparent hover:text-secondary-500 md:w-8/12 md:text-lg">
                    СТАТЬ ЧЕМПИОНОМ
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute right-[-0px] opacity-50">
        <img
          className="z-[1] max-h-[900px]"
          src="assets/landing/backimage.png"
        />
      </div>
    </div>
  )
}

export default EntrySection
