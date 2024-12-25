export default function CategoryDate() {
  return (
    <div className="flex flex-col gap-4 items-end justify-start w-1/2">
      <input type="text" placeholder="Title" name="title" className="p-2 border border-blue-800 rounded-md w-3/4 outline-none placeholder:text-blue-300 placeholder:font-medium" />

      <input type="number" placeholder="Minimum Value" name="minValue" className="p-2 border border-blue-800 rounded-md w-3/4 outline-none placeholder:text-blue-300 placeholder:font-medium" />

      <input type="number" placeholder="Buyout" name="buyout" className="p-2 border border-blue-800 rounded-md w-3/4 outline-none placeholder:text-blue-300 placeholder:font-medium" />
    </div>
  )
}