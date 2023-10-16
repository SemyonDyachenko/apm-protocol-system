import ListNode from "@/components/listNode"
import Competitor, {
  getCompetitorFullname,
  getCompetitorGender,
} from "@/models/Competitor"

type Props = {
  place: number
  data: Competitor
}

const CompetitorListNode = ({ place, data }: Props) => {
  const baseNodeLabelStyles = "font-medium text-gray-700 text-md"

  return (
    <ListNode>
      <div className={`font-extrabold ${baseNodeLabelStyles} w-1/12 text-lg `}>
        {place}
      </div>
      <div className="flex w-2/6 items-center justify-start gap-2">
        <div className="">
          <img
            className="h-[65px] w-[65px]  rounded-full border-2"
            src="assets/profilePage.png"
          />
        </div>
        <div className={`${baseNodeLabelStyles}`}>
          {getCompetitorFullname(data)}
        </div>
      </div>
      <div className={`${baseNodeLabelStyles} ml-2 w-1/6 text-left`}>
        {getCompetitorGender(data)}
      </div>
      <div className={`${baseNodeLabelStyles} ml-2 w-1/6 text-left`}>
        {data?.country}
      </div>
      <div className={`${baseNodeLabelStyles}  w-1/6 pl-2 text-center `}>
        {data.rank}
      </div>
      <div className={`${baseNodeLabelStyles} w-1/6 text-right`}>
        <div className="flex items-center gap-2">
          <div className="text-3xl font-extrabold text-secondary-500">
            {data?.elo_rating}
          </div>
          <div className="text-left text-sm font-semibold">
            Рейтинг
            <br />
            спортсмена
          </div>
        </div>
      </div>
    </ListNode>
  )
}

export default CompetitorListNode
