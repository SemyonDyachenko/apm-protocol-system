import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import Image from "/assets/landing/gallery/gallery1.jpg"

type Props = {}

const items: upMenuItem[] = [
  {
    title: "Фотографии",
    target: "photos",
    selected: true,
  },
]

const GalleryPage = (props: Props) => {
  return (
    <div>
      <div>
        <UpMenuBar items={items} />
      </div>
      <div>
        <div className="flex flex-wrap py-4">
          {new Array(1, 2, 3, 4).map((_, index) => (
            <div className="p-4">
              <img className="max-w-[370px] rounded-xl" src={Image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryPage
