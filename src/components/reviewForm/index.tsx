import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

type Props = {
  send: (text: string, rating: number) => void
}

const ReviewForm = ({ send }: Props) => {
  const [text, setText] = useState("")
  const [rating, setRating] = useState(1)
  return (
    <div className="f-wull">
      <form>
        <div>
          <textarea
            defaultValue={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] w-full rounded-lg border-2 border-gray-300 bg-gray-70 px-4 py-3 font-medium outline-none"
            placeholder="Комментарий"
          ></textarea>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex gap-2 text-lg ">
            {new Array(1, 2, 3, 4, 5).map((item, index) => (
              <FontAwesomeIcon
                onClick={() => setRating(index + 1)}
                className={`cursor-pointer ${
                  index + 1 <= rating ? "text-secondary-500" : "text-gray-300"
                } `}
                key={index}
                icon={faStar}
              />
            ))}
          </div>
          <div className="">
            <button
              onClick={() => send(text, rating)}
              className="rounded-lg bg-secondary-500 px-4 py-1 font-medium transition hover:bg-secondary-600"
            >
              Отправить
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm
