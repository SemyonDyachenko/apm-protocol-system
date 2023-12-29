import Image from "/assets/landing/gallery/gallery1.jpg"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import RatingInfo from "./ratingInfo"

type Props = {
  count: number
  rating: number
}

const menuItems: Array<upMenuItem> = [
  {
    title: "Фотографии",
    selected: true,
    target: "photos",
  },
]

const LeagueGallery = ({ count, rating }: Props) => {
  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <UpMenuBar items={menuItems} />
        </div>
        <RatingInfo count={count.toString()} rating={rating.toString()} />
      </div>
      <div className="flex flex-wrap gap-4">
        {new Array(1, 2, 3, 4).map((_, index) => (
          <div className="md:p-4">
            <img className="max-w-[350px] rounded-xl" src={Image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeagueGallery
