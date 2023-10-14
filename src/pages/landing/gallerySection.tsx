import React from "react"

type Props = {}

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
          <div className="my-4 h-[476px] w-full bg-gray-700 bg-opacity-50">
            <div className="itemse-console.error(first) mx-auto flex w-2/3 justify-between py-10">
              {new Array(1, 2, 3).map((element) => (
                <div>
                  <img
                    className="max-h-[400px] border-4 border-secondary-500"
                    src="assets/landing/gallery.png"
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
