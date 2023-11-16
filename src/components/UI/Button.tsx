import React from "react"

type Props = {
  disabled?: boolean
  className?: string
  onClick: () => void
  children: React.ReactNode
}

const ActionButton = ({ disabled, className, onClick, children }: Props) => {
  return (
    <button
      disabled={disabled}
      className={`${className} rounded-lg bg-secondary-500 px-4 py-2 transition hover:bg-secondary-600`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
