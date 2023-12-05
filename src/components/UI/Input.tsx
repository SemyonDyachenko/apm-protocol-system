import React from "react"

type Props = {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  type: string
}

const CustomInput = ({
  value,
  onChange,
  label,
  placeholder,
  disabled,
  className,
  type,
}: Props) => {
  return (
    <div>
      {label && <div className="py-1 text-sm text-gray-400">{label}:</div>}
      <input
        className={`text-md rounded-lg bg-gray-200 px-4 py-1 outline-none ${className}`}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  )
}

export default CustomInput
