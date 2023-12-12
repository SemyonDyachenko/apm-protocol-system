import { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

const HText = ({ children, className }: Props) => {
  return (
    <h1 className={`text-lg font-bold md:text-3xl ${className}`}>{children}</h1>
  )
}

export default HText
