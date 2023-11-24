import Checkbox from "@/components/UI/Checkbox"
import { useState } from "react"

type Props = {}

const NotificationPage = (props: Props) => {
  const [messageNotification, checkMessageNotification] = useState(false)
  const [emailNotification, setEmailNotification] = useState(false)
  return (
    <div>
      <div className="flex gap-2">
        <div className="mt-[1px]">
          <Checkbox
            className=""
            isChecked={messageNotification}
            changeState={checkMessageNotification}
          />
        </div>
        <div className="text-gray-400">Получать уведомления о сообщениях</div>
      </div>
      <div className="flex gap-2 pt-2">
        <div className="mt-[1px]">
          <Checkbox
            className=""
            isChecked={emailNotification}
            changeState={setEmailNotification}
          />
        </div>
        <div className="text-gray-400">
          Получать уведомления о новых турнирах по E-mail
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
