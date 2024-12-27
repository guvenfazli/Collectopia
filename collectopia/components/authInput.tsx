type AuthInputProps = {
  name: string;
  placeholder: string;
  type: string;
  setIsError: React.Dispatch<React.SetStateAction<false | { field: string, message: string }>>;
  isError: false | string
}

export default function AuthInput({ name, placeholder, type, setIsError, isError }: AuthInputProps) {
  return (
    <input onChange={() => setIsError(false)} name={name} id={name} placeholder={placeholder} className={`border p-3 rounded-lg outline-none placeholder:font-medium max-sm:p-2 border-orange-800 placeholder:text-orange-300 ${isError && isError === name && 'bg-red-300 placeholder:text-white'}`} type={type} />
  )
}
