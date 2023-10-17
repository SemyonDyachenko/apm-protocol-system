type InputProps = {
  value: string | undefined | Date
  title: string
  disabled?: boolean
  onChange?: (target: any) => void
  type?: string
  className?: string
}

const PersonalDataInput = ({
  value,
  title,
  disabled = true,
  onChange,
  type = "text",
  className,
}: InputProps) => {
  return (
    <div>
      <p
        className={`pb-2 text-sm ${
          disabled ? "text-gray-400" : "font-medium text-gray-700"
        }`}
      >
        {title}:{" "}
      </p>
      <input
        className={`${className} w-[260px] rounded-lg  px-4 py-2 font-medium text-gray-700 outline-none enabled:bg-gray-200 disabled:bg-none`}
        value={value?.toLocaleString()}
        disabled={disabled}
        onChange={onChange}
        type={type}
      />
    </div>
  )
}

export default PersonalDataInput
