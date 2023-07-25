import { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

const HText = ({ children, className }: Props) => {
  return <h1 className={`text-3xl font-bold ${className}`}>{children}</h1>
}

export default HText
