import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import { Link } from "react-router-dom"
import ListNode from "../listNode"
import NonImage from "/assets/utils/nonuserimage.jpg"

type CompetitorLinkProps = {
  competitor: Competitor
}

export const CompetitorLinkItem = ({ competitor }: CompetitorLinkProps) => {
  return (
    <Link className="hover:text-gray-700" to={`/competitor/${competitor.id}`}>
      <ListNode>
        <div className="flex w-full items-center justify-between px-10">
          <div className="flex w-1/4 items-center gap-8">
            <div>
              <img
                className="h-[65px] w-[65px] rounded-full"
                src={competitor.image?.toString() || NonImage}
              />
            </div>
            <div className="text-md font-semibold">
              {getCompetitorFullname(competitor)}
            </div>
          </div>
          <div className="flex w-1/6 justify-start font-medium">
            {competitor.city}
          </div>
          <div className="flex w-1/6 justify-start font-medium">
            {competitor.rank}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-black text-secondary-500 ">
              {competitor.elo_rating}
            </div>
            <div className="text-md font-semibold">
              Рейтинг
              <br />
              Спортсмена
            </div>
          </div>
        </div>
      </ListNode>
    </Link>
  )
}

export default CompetitorLinkItem
