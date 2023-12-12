type InputProps = {
  value: string | undefined | Date
  title: string
  disabled?: boolean
  onChange?: (target: any) => void
  type?: string
  className?: string
  placeholder?: string
}

const PersonalDataInput = ({
  value,
  title,
  disabled = true,
  onChange,
  type = "text",
  className,
  placeholder,
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
        className={`${className} w-full rounded-lg px-4  py-2 font-medium text-gray-700 outline-none enabled:bg-gray-200 disabled:bg-none md:w-[260px]`}
        value={value?.toLocaleString()}
        disabled={disabled}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

export default PersonalDataInput
