type AuthInputProps = {
  name: string;
  placeholder: string;
  type: string;
  setIsError: React.Dispatch<React.SetStateAction<boolean | string>>
}

export default function AuthInput({ name, placeholder, type, setIsError }: AuthInputProps) {
  return (
    <input onChange={() => setIsError(false)} required name={name} id={name} placeholder={placeholder} className="border p-3 rounded-lg outline-none placeholder:font-medium max-sm:p-2 border-orange-800 placeholder:text-orange-300" type={type} />
  )
}
