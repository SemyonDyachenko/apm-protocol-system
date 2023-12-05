import ReviewForm from "@/components/reviewForm"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import League from "@/models/League"
import { reviewAPI } from "@/services/reviewService"
import { useState, useEffect } from "react"
import RatingInfo from "./ratingInfo"
import { useAppDispatch } from "@/hooks/redux"
import {
  LeagueReviewData,
  createLeagueReview,
} from "@/store/actions/reviewAction"
import ReviewItem from "@/components/reviewItem"
import { getCompetitorFullname } from "@/models/Competitor"

type Props = {
  league: League
  count: number
  rating: number
  competitorId: number
}

const items: Array<upMenuItem> = [
  {
    title: "Комментарии",
    target: "general",
    selected: true,
  },
]

const ReviewsPage = ({ league, count, rating, competitorId }: Props) => {
  const dispatch = useAppDispatch()
  const { data: reviews } = reviewAPI.useFetchAllLeagueReviewsQuery(league.id)

  const sendReview = (text: string, rating: number) => {
    const data: LeagueReviewData = {
      text,
      author: competitorId,
      date: new Date(Date.now()).toISOString().slice(0, 10),
      rating: rating,
      league: league.id,
    }
    console.log(data)
    console.log(data.author)
    console.log(data.date)
    dispatch(createLeagueReview(data))
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <div className="flex">
        <div className="w-full md:w-1/2">
          <UpMenuBar items={items} />
        </div>
        <RatingInfo count={count.toString()} rating={rating.toString()} />
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
