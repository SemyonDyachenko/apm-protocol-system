import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const HText = ({ children }: Props) => {
  return <h1 className="text-3xl font-bold">{children}</h1>
}

export default HText
