type AuthInputProps = {
  name: string;
  placeholder: string;
  type: string;
  setIsError: React.Dispatch<React.SetStateAction<boolean | string>>
}

export default function AuthInput({ name, placeholder, type, setIsError }: AuthInputProps) {
  return (
    <input onChange={() => setIsError(false)} required name={name} id={name} placeholder={placeholder} className="border border-gray-400 p-3 rounded-lg outline-none placeholder:font-medium" type={type} />
  )
}
