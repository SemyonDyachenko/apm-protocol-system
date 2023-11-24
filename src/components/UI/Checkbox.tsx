import { useState } from "react"

type Props = {
  className: string
  isChecked: boolean
  changeState: (val: boolean) => void
}

const Checkbox = ({ className, isChecked, changeState }: Props) => {
  return (
    <label className={className}>
      <input
        type="checkbox"
        defaultChecked={isChecked}
        onChange={() => changeState(!isChecked)}
      />
      <span
        className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
        aria-hidden="true"
      />
    </label>
  )
}

export default Checkbox
