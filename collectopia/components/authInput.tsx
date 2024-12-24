type AuthInputProps = {
  name: string;
  placeholder: string;
}

export default function AuthInput({ name, placeholder }: AuthInputProps) {
  return (
    <input name={name} placeholder={placeholder} className="border border-gray-400 p-3 rounded-lg outline-none placeholder:font-medium" type="text" />
  )
}
