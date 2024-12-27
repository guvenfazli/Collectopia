type ComponentProps = {
  isError: string | boolean
}

export default function TitlePrice({ isError }: ComponentProps) {
  return (
    <div className="flex flex-col gap-4 items-start justify-start w-1/2">
      <input type="text" required placeholder="Title" name="title" className="shadow-sm shadow-slate-500 p-2 border border-blue-800 rounded-md w-3/4 outline-none placeholder:text-blue-300 placeholder:font-medium" />

      <input type="text" required placeholder="Minimum Value" name="minValue" className="shadow-sm shadow-slate-500 p-2 border border-blue-800 rounded-md w-3/4 outline-none placeholder:text-blue-300 placeholder:font-medium" />

      <input type="text" required placeholder="Buyout" name="buyout" className="shadow-sm shadow-slate-500 p-2 border border-blue-800 rounded-md w-3/4 outline-none placeholder:text-blue-300 placeholder:font-medium" />
    </div>
  )
}