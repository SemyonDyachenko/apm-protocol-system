import UpMenuBar from "@/components/upMenu/upMenuBar"
import { CompetitorData } from "@/store/slices/competitorSlice"
import { useState, useEffect } from "react"
import { leaguesNavItems } from "./navItems"
import { leagueAPI } from "@/services/leaugeService"
import ListNode from "@/components/listNode"
import ActionButton from "@/components/UI/Button"
import { getLeagueLevel } from "@/models/League"
import { Link, useNavigate } from "react-router-dom"
import ConfirmModal from "@/components/modals/confirmModal"
import Checkbox from "@/components/UI/Checkbox"
import { useAppDispatch } from "@/hooks/redux"
import CustomInput from "@/components/UI/Input"
import { createDefaultLeague, deleteLeague } from "@/store/actions/leagueActon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

type Props = {
  competitor: CompetitorData
}

const LeaguesWindow = ({ competitor }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [target, setTarget] = useState(leaguesNavItems[0].target)
  const { data: leagues } = leagueAPI.useFetchCompetitorLeaguesQuery(
    competitor.id
  )
  const { data: myLeagues } = leagueAPI.useFetchAllLeaguesQuery(100)
  const [modalActive, setModalActive] = useState(false)
  const [leagueName, setLeagueName] = useState("")
  const [deleteModalActive, setDeleteModalActive] = useState(false)
  const [onDeleteLeague, setOnDeleteLeague] = useState(0)

  const createLeague = () => {
    if (leagueName.length > 0)
      dispatch(createDefaultLeague(competitor.id, leagueName)).then((res) => {
        if (res) {
          console.log(res.data)
          if (res.status === 201) {
            navigate(`/league/editing/${res.data["id"]}`)
            window.location.reload()
          }
          console.log(res)
        }
      })
  }

  const removeLeague = () => {
    dispatch(deleteLeague(onDeleteLeague, competitor.id)).then((res) => {
      setOnDeleteLeague(0)
      window.location.reload()
    })
  }

  return (
    <div>
      <div className="space-between flex items-end ">
        <div className="w-3/4">
          <UpMenuBar changeTarget={setTarget} items={leaguesNavItems} />
        </div>
        <div className="w-1/4">
          <div className="flex justify-end">
            <ActionButton
              className="mb-3 font-medium"
              onClick={() => setModalActive(true)}
            >
              Создать лигу
            </ActionButton>
          </div>
          <div className="h-[1px] w-full bg-gray-80"></div>
        </div>
      </div>
      <div>
        <div className="py-4">
          {target === "competitor" ? (
            leagues?.map((league, index) => (
              <ListNode classname="font-medium" key={index}>
                <div className="w-1/4">{league.league.name}</div>
                <div className="w-1/4">{league.league.country}</div>
                <div className="w-1/4 text-end">
                  {getLeagueLevel(league.league)}
                </div>
                <div className="w-1/4 text-end">
                  <Link
                    className="hover:text-gray-700"
                    to={`/league/${league.id}`}
                  >
                    <button
                      className="rounded-lg bg-secondary-500 px-4 py-1 font-medium text-gray-700 transition hover:bg-secondary-600"
                      onClick={() => {}}
                    >
                      Подробнее
                    </button>
                  </Link>
                </div>
              </ListNode>
            ))
          ) : (
            <div>
              {myLeagues &&
                myLeagues
                  .filter((item) => +item.president === competitor.id)
                  .map((league, index) => (
                    <ListNode classname="font-medium" key={index}>
                      <div className="w-1/12 cursor-pointer" onClick={() => {}}>
                        <FontAwesomeIcon
                          onClick={() => {
                            setOnDeleteLeague(league.id)
                            setDeleteModalActive(true)
                          }}
                          className="transition hover:text-secondary-500"
                          icon={faTrash}
                        />
                      </div>
                      <div className="w-1/4">{league.name}</div>
                      <div className="w-1/4">{league.country}</div>
                      <div className="w-1/4 text-end">
                        {getLeagueLevel(league)}
                      </div>
                      <div className="w-1/4 text-end">
                        <Link
                          className="hover:text-gray-700"
                          to={`/league/editing/${league.id}`}
                        >
                          <button className="rounded-lg bg-secondary-500 px-4 py-1 font-medium text-gray-700 transition hover:bg-secondary-600">
                            Подробнее
                          </button>
                        </Link>
                      </div>
                    </ListNode>
                  ))}
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        text="Добавить лигу и перейти к заполнению?"
        active={modalActive}
        closeFunc={() => {
          setModalActive(false)
          setLeagueName("")
        }}
        action={() => createLeague()}
      >
        <div>
          <div className="pb-2">
            <CustomInput
              className="w-full py-2 font-medium"
              label="Название"
              value={leagueName}
              onChange={setLeagueName}
            />
          </div>
          <div className="mt-2 flex gap-2">
            <Checkbox className="" isChecked={true} changeState={() => {}} />
            <div className="-mt-1">
              Я ознакомился с{" "}
              <Link
                className="text-secondary-500 underline transition hover:text-secondary-400"
                to="/"
              >
                правилами добавления новой лиги
              </Link>
            </div>
          </div>
        </div>
      </ConfirmModal>
      <ConfirmModal
        active={deleteModalActive}
        closeFunc={() => {
          setDeleteModalActive(false)
          setOnDeleteLeague(0)
        }}
        action={removeLeague}
        text="Вы хотите удалить лигу?"
      ></ConfirmModal>
    </div>
  )
}

export default LeaguesWindow
