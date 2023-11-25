import { faCamera, faCheck, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type Props = {
  name?: string
  logo: string
  banner: string
  onClick?: () => void
  disabledButton: boolean
  editing?: boolean
  verified?: boolean
  onChangeName: (val: string) => void
  targetId?: number
  league: boolean
  editingButton?: boolean
}

const UpBanner = ({
  name,
  logo,
  banner,
  onClick,
  disabledButton,
  editing,
  verified,
  onChangeName,
  targetId,
  league,
  editingButton,
}: Props) => {
  return (
    <div className="relative mt-12 h-[380px] w-full rounded-t-2xl rounded-b-2xl shadow-lg">
      <div className="z-[1] ">
        <img
          className="z-4 absolute h-full w-full  rounded-t-xl rounded-b-2xl"
          src={banner}
        />
      </div>
      <div className="absolute right-0 bottom-1/3 z-[20] pr-4 pb-2">
        <div className="cursor-pointer text-gray-300">
          <FontAwesomeIcon
            className="text-2xl transition hover:text-secondary-500"
            icon={faCamera}
          />
        </div>
      </div>
      <div className="absolute z-[5] h-full w-full rounded-2xl bg-black opacity-30"></div>
      <div className="relative -bottom-1 z-[10] flex h-full w-full items-end">
        <div className="flex h-1/3 w-full justify-between rounded-2xl bg-gray-80">
          <div className="flex px-10">
            <div className="-translate-y-6">
              <div className="relatvie h-[85px] w-[85px] rounded-full bg-gray-80">
                <div className="absolute ml-[5px] mt-[5px] flex h-[75px] w-[75px] cursor-pointer items-center justify-center rounded-full bg-black opacity-[0.001] transition hover:opacity-70">
                  <FontAwesomeIcon
                    className="text-3xl text-gray-300"
                    icon={faCamera}
                  />
                </div>
                <img className="h-full w-full rounded-full p-1" src={logo} />
              </div>
            </div>
            <div className="py-4 px-2">
              <div className="flex items-center gap-3 text-xl font-bold">
                {editing ? (
                  <div>
                    <input
                      className="rounded-lg bg-gray-200 py-1 px-4 text-lg outline-none"
                      defaultValue={name}
                      onChange={(e) => onChangeName(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>{name}</div>
                )}
                {verified && <FontAwesomeIcon color="green" icon={faCheck} />}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 py-2">
                  {new Array(1, 2, 3, 4, 5).map((element, index) => (
                    <FontAwesomeIcon
                      className={`${
                        editing ? "text-gray-400" : "text-secondary-500"
                      }`}
                      key={index}
                      icon={faStar}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-400">(4.09)</div>
              </div>
            </div>
          </div>
          <div className="px-10 py-4">
            <div>
              {!editing ? (
                <button
                  onClick={onClick}
                  disabled={disabledButton}
                  className="rounded-xl bg-secondary-500 py-2 px-4 font-medium text-gray-700 shadow-md transition hover:bg-secondary-600 active:translate-y-1 disabled:bg-gray-200"
                >
                  {!disabledButton ? "Подать заявку" : "Вы участник"}
                </button>
              ) : (
                <button
                  onClick={onClick}
                  className="rounded-xl bg-secondary-500 py-2 px-4 font-medium text-gray-700 shadow-md transition hover:bg-secondary-600 active:translate-y-1 disabled:bg-gray-200"
                >
                  Сохранить
                </button>
              )}
            </div>
            {!editing && editingButton && (
              <div className="flex items-center justify-center gap-2 py-2 text-sm text-gray-400">
                <Link
                  to={`/${
                    league ? "league" : "tournament"
                  }/editing/${targetId}`}
                >
                  <div className="cursor-pointer transition hover:text-gray-300">
                    Редактировать
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpBanner
