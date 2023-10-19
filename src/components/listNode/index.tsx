import React from "react"

type Props = {
  classname?: string
  children: React.ReactNode
}

const ListNode = ({ classname, children }: Props) => {
  return (
    <div
      className={`mb-2 w-full rounded-[10px] border-2 border-gray-300 bg-gray-70 transition hover:bg-gray-200`}
    >
      <div
        className={`flex items-center justify-between py-2 px-10 ${classname}`}
      >
        {children}
      </div>
    </div>
  )
}

export default ListNode