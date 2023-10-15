import Competitor from "@/models/Competitor"

type Props = {
  data: Competitor
}

const CompetitorListNode = ({ data }: Props) => {
  const baseNodeLabelStyles = "font-medium text-gray-700 text-md"

  return (
    <div className="mb-2 w-full rounded-[10px] border-2 border-gray-300 bg-gray-70 transition hover:bg-gray-200">
      <div className="flex items-center justify-between py-2 px-10">
        <div
          className={`font-extrabold ${baseNodeLabelStyles} w-1/12 text-lg `}
        >
          1
        </div>
        <div className="flex w-2/6 items-center justify-start gap-2">
          <div className="">
            <img
              className="h-[65px] w-[65px]  rounded-full border-2"
              src="assets/profilePage.png"
            />
          </div>
          <div className={`${baseNodeLabelStyles}`}>
            {data?.first_name + " " + data?.last_name}
          </div>
        </div>
        <div className={`${baseNodeLabelStyles} ml-2 w-1/6 text-left`}>
          {data?.gender}
        </div>
        <div className={`${baseNodeLabelStyles} ml-2 w-1/6 text-left`}>
          {data?.country}
        </div>
        <div className={`${baseNodeLabelStyles}  w-1/6 pl-2 text-center `}>
          МКС
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
      </div>
    </div>
  )
}

export default CompetitorListNode
