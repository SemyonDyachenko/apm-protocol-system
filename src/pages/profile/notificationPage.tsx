type Props = {}

const NotificationPage = (props: Props) => {
  return (
    <div>
      <div className="flex gap-2">
        <div>
          <input type="checkbox" />
        </div>
        <div className="text-gray-400">Получать уведомления о сообщениях</div>
      </div>
      <div className="flex gap-2 pt-2">
        <div>
          <input type="checkbox" />
        </div>
        <div className="text-gray-400">
          Получать уведомления о новых турнирах по E-mail
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
