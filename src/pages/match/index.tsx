type Props = {}

const MatchPage = (props: Props) => {
  return (
    <div className="p-5">
      <div className="flex justify-center pt-2">
        <div className="text-2xl font-bold text-gray-700">
          Поединок в рамках Вселенского туринра по Армрестлингу
        </div>
      </div>
      <div className="flex justify-center pt-16">
        <div className="w-2/6 rounded-xl border-2 bg-white shadow-xl"></div>
        <div className="flex w-1/6 items-center justify-center text-6xl font-bold text-gray-700">
          VS
        </div>
        <div className="w-2/6 rounded-xl border-2 bg-white py-16 shadow-xl"></div>
      </div>
    </div>
  )
}

export default MatchPage
