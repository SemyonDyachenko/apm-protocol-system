import { getNormalizeDate } from "@/utils/date"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type Props = {
  rating: number
  text: string
  author: { name: string; competitorId: number }
  date: Date
}

const ReviewItem = ({ rating, text, author, date }: Props) => {
  return (
    <div className="my-4">
      <div>
        <div className="items-center justify-between gap-4 pb-1 md:flex">
          <div className="flex items-center gap-3">
            <div>
              <Link
                className="text-secondary-500 underline transition hover:text-secondary-400"
                to={`/competitor/${author.competitorId}`}
              >
                {author.name}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 py-2">
                {new Array(1, 2, 3, 4, 5).map((element, index) => (
                  <FontAwesomeIcon
                    className={
                      index + 1 <= rating
                        ? "text-secondary-500"
                        : "text-gray-300"
                    }
                    key={index}
                    icon={faStar}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">({rating}.0)</span>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-400">
            {getNormalizeDate(new Date(date).toString())}
          </div>
        </div>
        <div className="my-1">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default ReviewItem
