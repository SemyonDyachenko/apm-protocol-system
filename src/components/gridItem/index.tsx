import React, { ReactNode } from "react"

type Props = {
  title: string
  value: ReactNode
}

const GridItem = ({ title, value }: Props) => {
  return (
    <div>
      <span className="text-sm text-gray-400">{title}:</span>
      <div className="text-sm font-medium text-gray-700">{value}</div>
    </div>
  )
}

export default GridItem
