interface FormInputProps {
  label?: string
  id: string
  value: string
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void
  type?: string
  placeholder?: string
  error?: string
}

export default function FormInput({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: FormInputProps) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && <p>{error}</p>}
    </div>
  )
}