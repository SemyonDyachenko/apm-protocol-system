import Image from "/assets/landing/gallery/gallery1.jpg"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import RatingInfo from "./ratingInfo"

type Props = {}

const menuItems: Array<upMenuItem> = [
  {
    title: "Фотографии",
    selected: true,
    target: "photos",
  },
]

const LeagueGallery = (props: Props) => {
  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <UpMenuBar items={menuItems} />
        </div>
        <RatingInfo count={"63"} rating={"1333"} />
      </div>
      <div className="flex flex-wrap">
        {new Array(1, 2, 3, 4).map((_, index) => (
          <div className="p-4">
            <img className="max-w-[350px] rounded-xl" src={Image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeagueGallery
