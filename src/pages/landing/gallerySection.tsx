import { motion } from "framer-motion"
import PerfectScrollbar from "react-perfect-scrollbar"

type Props = {}

const galleryImages = [
  {
    url: "gallery1.jpg",
    caption: "Slide 1",
  },
  {
    url: "gallery2.jpg",
    caption: "Slide 2",
  },
  {
    url: "gallery3.jpg",
    caption: "Slide 3",
  },
  {
    url: "gallery4.jpg",
    caption: "Slide 3",
  },
  {
    url: "gallery5.jpg",
    caption: "Slide 3",
  },
  {
    url: "gallery6.jpg",
    caption: "Slide 3",
  },
]

const GallerySection = (props: Props) => {
  const overlayStyles = `p-5 absolute z-10 flex w-full h-full flex-col items-center justify-center
   whitespace-normal bg-gray-700 text-center  text-white opacity-[0.001%] transition
     hover:opacity-80 rounded-lg`

  return (
    <div className="relative min-h-screen max-w-full bg-gray-800 text-white">
      <div className="z-8 relative">
        <div className="mx-auto  w-11/12">
          <motion.div
            transition={{ delay: 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            initial={{ opacity: 0.2, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="flex w-full flex-col md:w-2/5">
              <span className="mt-16 text-3xl font-extrabold uppercase text-gray-300 md:text-5xl">
                НЕДАВНИЕ СОБЫТИЯ
              </span>
              <div className="mt-2 h-2 w-full rounded-lg bg-secondary-500"></div>
            </div>
            <div className="w-full py-8 md:w-1/2">
              <h3 className="text-sm font-semibold text-secondary-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eveniet natus, repellat optio fugit at qui expedita quis illo,
                doloremque eaque provident mollitia unde, ratione quasi vitae
                nostrum
              </h3>
            </div>
          </motion.div>
        </div>

        <div>
          <div className="mx-auto mt-4 flex h-auto w-full justify-center bg-gray-700 bg-opacity-50">
            <PerfectScrollbar className="w-full md:w-2/3">
              <div className=" w-2/3 py-20">
                <ul className="flex w-[2800px]  whitespace-nowrap">
                  {galleryImages.map((element, index) => (
                    <motion.div
                      transition={{ delay: 0.2 }}
                      viewport={{ once: false, amount: 0.5 }}
                      initial={{ opacity: 0.1, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      key={index}
                    >
                      <li className="relative mx-3 inline-block h-[350px] w-[500px]">
                        <div className={overlayStyles}>
                          <div className=" text-xl font-semibold text-secondary-500">
                            TOURNAMENT
                          </div>
                          <div className="py-10 px-5 text-lg font-medium">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Debitis similique mollitia consequuntur earum
                            eum reprehenderit ea minus esse amet eveniet!
                          </div>
                        </div>
                        <img
                          className="h-full w-full rounded-xl transition"
                          src={`assets/landing/gallery/${element.url}`}
                          alt="image"
                        />
                      </li>
                    </motion.div>
                  ))}
                </ul>
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GallerySection
