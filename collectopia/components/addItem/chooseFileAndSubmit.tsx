export default function ChooseFileAndSubmit(){
  return (
    <div className="flex flex-row items-start justify-center gap-5">
      <input type="file" multiple required className="file:font-medium file:duration-150 file:bg-blue-800 file:py-1 file:px-5 file:border-none file:text-white file:rounded-md file:shadow-2xl file:cursor-pointer file:hover:bg-blue-950" />
      <button className="duration-150 py-1 px-5 text-white rounded-md font-medium bg-blue-800 hover:bg-blue-950">Submit</button>
    </div>
  )
}