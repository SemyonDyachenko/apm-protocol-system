type Props = {}

const Main = (props: Props) => {
  return (
    <div className="p-10">
      <div className="mx-auto flex w-full flex-wrap justify-center gap-2">
        {new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).map((element, index) => (
          <div className="h-[200px] w-[250px] bg-gray-50" key={index}>
            <div className="p-3 text-2xl font-bold text-gray-400">
              90 - 95 KG
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main
