import { CompetitorData } from "@/store/slices/competitorSlice"
import React, { useState } from "react"
import PersonalDataInput from "./PersonalDataInput"
import ActionButton from "@/components/UI/Button"
import { useAppDispatch } from "@/hooks/redux"
import { updateCompetitorStats } from "@/store/actions/competitorAction"

type Props = {
  competitor: CompetitorData
}

const StatsPage = ({ competitor }: Props) => {
  const dispatch = useAppDispatch()
  const [disabled, setDisabled] = useState(true)

  const [grip, setGrip] = useState(competitor.grip)
  const [biceps, setBiceps] = useState(competitor.biceps)
  const [crossbar, setCrossbar] = useState(competitor.crossbar)
  const [shaft, setShaft] = useState(competitor.shaft)
  const [militarypress, setMilitarypress] = useState(competitor.militarypress)
  const [hand, setHand] = useState(competitor.hand)
  const [press, setPress] = useState(competitor.hand)
  const [side, setSide] = useState(competitor.side)

  const clearValues = () => {
    setGrip(competitor.grip)
    setBiceps(competitor.biceps)
    setCrossbar(competitor.crossbar)
    setShaft(competitor.shaft)
    setMilitarypress(competitor.militarypress)
    setHand(competitor.hand)
    setPress(competitor.press)
    setSide(competitor.side)
  }

  const items = [
    {
      value: grip?.toString(),
      title: "Хват",
      onchange: (e: any) => setGrip(e.target.value),
    },
    {
      value: biceps?.toString(),
      title: "Бицепс",
      onchange: (e: any) => setBiceps(e.target.value),
    },
    {
      value: crossbar?.toString(),
      title: "Турник",
      onchange: (e: any) => setCrossbar(e.target.value),
    },
    {
      value: shaft?.toString(),
      title: "Луч",
      onchange: (e: any) => setShaft(e.target.value),
    },
    {
      value: militarypress?.toString(),
      title: "Армжим",
      onchange: (e: any) => setMilitarypress(e.target.value),
    },
    {
      value: hand?.toString(),
      title: "Кисть",
      onchange: (e: any) => setHand(e.target.value),
    },
    {
      value: press?.toString(),
      title: "Жим",
      onchange: (e: any) => setPress(e.target.value),
    },
    {
      value: side?.toString(),
      title: "Бок",
      onchange: (e: any) => setSide(e.target.value),
    },
  ]

  const updateStats = () => {
    competitor &&
      dispatch(
        updateCompetitorStats(
          competitor.id,
          grip,
          biceps,
          crossbar,
          shaft,
          militarypress,
          hand,
          press,
          side
        )
      )
  }

  return (
    <div>
      <div className="w-full py-2">
        <div className="flex items-center justify-between">
          <div className="text-lg text-gray-400">Спортивные характерстики</div>
          <div
            onClick={() => {
              if (!disabled) clearValues()
              setDisabled(!disabled)
            }}
            className="cursor-pointer text-sm text-gray-400 underline transition hover:text-gray-700"
          >
            {disabled ? "Редактировать" : "Отменить"}
          </div>
        </div>
        <div className="lg:w-2/3 grid w-full grid-cols-2 gap-4 pt-4 md:grid-cols-4">
          {items.map((item, index) => (
            <PersonalDataInput
              className="max-w-[180px]"
              type="number"
              key={index}
              disabled={disabled}
              value={item.value}
              onChange={item.onchange}
              title={item.title}
            />
          ))}
        </div>
        <div className="pb-3 pt-4">
          <ActionButton
            onClick={() => {
              setDisabled(true)
              updateStats()
              window.location.reload()
            }}
            disabled={disabled}
            className="w-full font-medium disabled:bg-gray-400 md:w-auto"
          >
            Сохранить
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

export default StatsPage
