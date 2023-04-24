import React from "react"

type Props = {}

const LeaguePage = (props: Props) => {
  return (
    <div className="p-20">
      <div className="space-between mx-auto flex w-5/6 gap-12">
        <div className="w-4/6">
          <div className="h-40 w-full bg-secondary-400">Hello world</div>
          <div className="my-4 w-full">
            {new Array(1, 2, 3, 5, 6).map((element) => (
              <div className="my-2 h-32 bg-secondary-400">Tournament</div>
            ))}
          </div>
        </div>
        <div className="h-[500px] w-2/6 bg-secondary-400"></div>
      </div>
    </div>
  )
}

export default LeaguePage
