import { faCamera, faCheck, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type Props = {
  name?: string
  onClick?: () => void
  disabledButton: string | boolean
  editing?: boolean
  verified?: boolean
  onChangeName: (val: string) => void
  targetId?: number
  league: boolean
  editingButton?: boolean
  onCameraClick: (type: string, image: any) => void
  logo?: File
  banner?: File
  rating: number
  editingLink: string
}

const UpBanner = ({
  name,
  onClick,
  disabledButton,
  editing,
  verified,
  onChangeName,
  targetId,
  league,
  editingButton,
  onCameraClick,
  editingLink,
  logo,
  banner,
  rating,
}: Props) => {
  return (
    <div className="relative mt-12 h-[380px] w-full rounded-3xl shadow-lg md:rounded-t-2xl md:rounded-b-2xl">
      <div className="z-[1] ">
        <img
          className="z-4 absolute h-full w-full  rounded-b-3xl rounded-t-2xl md:rounded-b-2xl md:rounded-t-xl"
          src={banner?.toString() || ""}
        />
      </div>
      <div className={`absolute right-0 bottom-1/3 z-[20] pr-4 pb-2`}>
        <div className="cursor-pointer text-gray-300">
          {editing && (
            <label className="h-full w-full cursor-pointer">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    onCameraClick("banner", e.target.files[0])
                  }
                }}
                disabled={!editing}
                accept="image/png, image/jpeg"
                className="hidden h-full w-full  rounded-lg bg-secondary-500 py-2 shadow-md transition hover:bg-secondary-600"
              />
              <FontAwesomeIcon
                className="text-2xl transition hover:text-secondary-500"
                icon={faCamera}
              />
            </label>
          )}
        </div>
      </div>
      <div className="absolute z-[5] h-full w-full rounded-2xl bg-black opacity-30"></div>
      <div className="relative -bottom-1 z-[10] flex h-full w-full items-end">
        <div className="w-full justify-between rounded-2xl bg-gray-80 md:flex md:h-1/3">
          <div className="flex px-10">
            <div className="-translate-y-6">
              <div className="relatvie h-[85px] w-[85px] rounded-full bg-gray-80">
                <div
                  className={`absolute ml-[5px] mt-[5px] flex h-[75px] w-[75px] cursor-pointer items-center justify-center rounded-full bg-black opacity-[0.001] transition ${
                    editing && "hover:opacity-70"
                  }`}
                >
                  <label className="flex h-full w-full cursor-pointer items-center justify-center">
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files) {
                          onCameraClick("logo", e.target.files[0])
                        }
                      }}
                      disabled={!editing}
                      accept="image/png, image/jpeg"
                      className="hidden w-full rounded-lg bg-secondary-500 py-2 shadow-md transition hover:bg-secondary-600"
                    />
                    <FontAwesomeIcon
                      className="text-3xl text-gray-300"
                      icon={faCamera}
                    />
                  </label>
                </div>
                <img
                  className="h-full w-full rounded-full p-1"
                  src={logo?.toString() || ""}
                />
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
                        index >= Math.floor(rating)
                          ? "text-gray-400"
                          : "text-secondary-500"
                      }`}
                      key={index}
                      icon={faStar}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-400">
                  ({rating.toFixed(1)})
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 px-10 md:mb-0 md:py-8">
            <div>
              {!editing ? (
                <button
                  onClick={onClick}
                  disabled={disabledButton !== false}
                  className="w-full rounded-xl bg-secondary-500 py-2 px-4 font-semibold text-gray-700 shadow-md transition hover:bg-secondary-600 active:translate-y-1 disabled:bg-gray-200 md:w-auto"
                >
                  {disabledButton === "sent" && "Заявка отправлена"}
                  {!disabledButton && "Подать заявку"}
                  {!league && disabledButton === true && "Турнир завершен"}
                  {disabledButton === "accepted" && (
                    <div className="text-gray-400">
                      Вы участник
                      <FontAwesomeIcon
                        className="px-2 text-sm"
                        icon={faCheck}
                      />
                    </div>
                  )}
                </button>
              ) : (
                <button
                  onClick={onClick}
                  className="rounded-xl bg-secondary-500 py-2 px-5 font-semibold text-gray-700 shadow-md transition hover:bg-secondary-600 disabled:bg-gray-200"
                >
                  Сохранить
                </button>
              )}
            </div>
            {!editing && editingButton && (
              <div className="flex items-center justify-center gap-2 py-2 text-sm text-gray-400">
                <Link to={`/${editingLink}/editing/${targetId}`}>
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
