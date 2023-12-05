import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import Logo from "/assets/loggo.png"
import UpBanner from "@/components/upbanner"

type Props = {}

const TeamPage = (props: Props) => {
  return (
    <div className="mx-auto w-11/12">
      <div>
        <UpBanner
          disabledButton={false}
          league={false}
          onChangeName={() => {}}
          onCameraClick={() => {}}
          editing={false}
          rating={0}
          name="Команда"
        />
      </div>
    </div>
  )
}

export default TeamPage
