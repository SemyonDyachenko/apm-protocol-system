import React from "react"

type Props = {}

const galleryImages = [
  {
    url: "gallery1.jpg",
  },
  {
    url: "gallery2.jpg",
  },
  {
    url: "gallery6.jpg",
  },
]

const GallerySection = (props: Props) => {
  return (
    <div className="relative h-screen max-w-full bg-gray-700 text-white">
      <div className="absolute">
        <img src="assets/landing/Polygon5.png" />
      </div>
      <div className="z-1 absolute right-0 max-h-screen">
        <img
          className="max-h-screen scale-y-125"
          src="assets/landing/Polygon4.png"
        />
      </div>
      <div className="z-8 relative">
        <div className="flex items-center justify-center py-5">
          <div className="flex flex-col justify-center">
            <span className="text-center text-4xl font-extrabold uppercase">
              Галерея
            </span>
            <div className="h-1 w-[200px] bg-secondary-500"></div>
          </div>
        </div>
        <div>
          <div className="my-4 flex h-auto w-full justify-center bg-gray-700 bg-opacity-50">
            <div className="grid grid-cols-3 grid-rows-1 gap-y-6 gap-x-24 py-20">
              {galleryImages.map((element, index) => (
                <div key={index}>
                  <img
                    className="h-[400px] w-[380px]  border-4 border-secondary-500"
                    src={`assets/landing/gallery/${element.url}`}
                    alt="image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GallerySection
