import { useState } from "react"
import { BaseSyntheticEvent } from "react"

export default function ChooseFileAndSubmit({ setImagePicker, setImageShowcase }) {

  const [imagePrev, setImagePrev] = useState()



  function getImage(e: BaseSyntheticEvent) { // Gets image for showcase
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i]
      console.log(file)
      const fileLink = URL.createObjectURL(file)
      setImageShowcase((prev: string[]) => {
        const updated = [...prev]
        updated.push(fileLink)
        return updated
      })
    }
  }



  return (
    <div className="flex flex-row items-start justify-center gap-5">
      <input type="file" multiple onChange={(e) => getImage(e)} required className="file:font-medium file:duration-150 file:bg-blue-800 file:py-1 file:px-5 file:border-none file:text-white file:rounded-md file:shadow-2xl file:cursor-pointer file:hover:bg-blue-950" />

      <button className="duration-150 py-1 px-5 text-white rounded-md font-medium bg-blue-800 hover:bg-blue-950">Submit</button>
    </div>
  )
}