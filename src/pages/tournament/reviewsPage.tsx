import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import RatingInfo from "../league/ratingInfo"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import { getAvarageRating } from "@/utils/eloCalculation"
import Tournament from "@/models/Tournament"
import { tournamentAPI } from "@/services/tournamentsService"
import ReviewItem from "@/components/reviewItem"
import ReviewForm from "@/components/reviewForm"
import { reviewAPI } from "@/services/reviewService"
import {
  TournamentReviewData,
  createTournamentReview,
} from "@/store/actions/reviewAction"
import { useAppDispatch } from "@/hooks/redux"

type Props = {
  tournament: Tournament
  competitorId: number
}

const items: Array<upMenuItem> = [
  {
    title: "Комментарии",
    target: "general",
    selected: true,
  },
]

const ReviewsPage = ({ tournament, competitorId }: Props) => {
  const dispatch = useAppDispatch()
  const { data: competitors } =
    tournamentAPI.useFetchTournamentRegistrationQuery(tournament.id)
  const { data: reviews } = reviewAPI.useFetchAllTournamentReviewsQuery(
    tournament.id
  )

  const sendReview = (text: string, rating: number) => {
    const data: TournamentReviewData = {
      text,
      author: competitorId,
      date: new Date(Date.now()).toISOString().slice(0, 10),
      rating: rating,
      tournament: tournament.id,
    }
    console.log(data)
    console.log(data.author)
    console.log(data.date)
    dispatch(createTournamentReview(data))
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="w-1/2">
          <UpMenuBar items={items} />
        </div>
        {competitors && (
          <RatingInfo
            rating={getAvarageRating(competitors).toString()}
            count={competitors?.length.toString()}
          />
        )}
      </div>
      <div className="my-4  px-2">
        <div>
          {reviews?.map((review, index) => (
            <ReviewItem
              key={index}
              author={{
                name: getCompetitorFullname(review.author) || "not found",
                competitorId: review.author.id,
              }}
              rating={review.rating}
              text={review.text}
              date={review.date}
            />
          ))}
        </div>
        <div>
          <ReviewForm send={sendReview} />
        </div>
      </div>
    </div>
  )
}

export default ReviewsPage
