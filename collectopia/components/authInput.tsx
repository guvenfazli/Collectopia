type AuthInputProps = {
  name: string;
  placeholder: string;
  type: string
}

export default function AuthInput({ name, placeholder, type }: AuthInputProps) {
  return (
    <input required name={name} id={name} placeholder={placeholder} className="border border-gray-400 p-3 rounded-lg outline-none placeholder:font-medium" type={type} />
  )
}
