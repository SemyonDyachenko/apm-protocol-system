import { useState } from "react"

type Props = {
  className: string
}

const Checkbox = ({ className }: Props) => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <label>
      <input
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked)
        }}
      />
      <span
        className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
        aria-hidden="true"
      />
    </label>
  )
}

export default Checkbox
