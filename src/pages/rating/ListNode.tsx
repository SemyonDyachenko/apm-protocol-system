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
      <div
        className={`font-extrabold ${baseNodeLabelStyles} hidden w-1/12 text-lg text-secondary-500 md:block`}
      >
        {place}
      </div>
      <div className="flex w-4/5 items-center justify-start gap-2 md:w-2/6">
        <div className="">
          <img
            className="h-[65px] w-[65px]  rounded-full border-2"
            src={data.image?.toString() || "assets/utils/nonuserimage.jpg"}
            alt="image"
          />
        </div>
        <div className={`${baseNodeLabelStyles}`}>
          {getCompetitorFullname(data)}
        </div>
      </div>
      <div
        className={`${baseNodeLabelStyles} ml-2 hidden w-1/6 text-left md:block`}
      >
        {getCompetitorGender(data)}
      </div>
      <div
        className={`${baseNodeLabelStyles} ml-2 hidden  w-1/6 text-left md:block`}
      >
        {data?.country}
      </div>
      <div
        className={`${baseNodeLabelStyles} hidden w-1/6  pl-2 text-center md:block `}
      >
        {data.rank}
      </div>
      <div className={`${baseNodeLabelStyles} w-1/6 text-right`}>
        <div className="flex justify-end gap-2 text-3xl font-extrabold text-secondary-500">
          {data?.elo_rating}
        </div>
      </div>
    </ListNode>
  )
}

export default CompetitorListNode
