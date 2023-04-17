import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"

type Props = {
  icon: IconProp
  selected?: boolean
  children: ReactNode
  onClick?: () => void
}

const ProfileMenuItem = ({ onClick, icon, selected, children }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${
        selected && "border-r-4"
      } flex w-full cursor-pointer items-center gap-3 border-secondary-400 px-5
       py-3 text-gray-400 hover:border-r-4
        hover:bg-gray-200 hover:bg-opacity-25 hover:text-white`}
    >
      <FontAwesomeIcon className="text-xl" icon={icon} />
      <div>{children}</div>
    </div>
  )
}

export default ProfileMenuItem
