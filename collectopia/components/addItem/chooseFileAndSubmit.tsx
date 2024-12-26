import { useState } from "react"
import Image from "next/image"
import { BaseSyntheticEvent } from "react"

export default function ChooseFileAndSubmit({ setImagePicker, setImageShowcase }) {

  const [imagePrev, setImagePrev] = useState()



  function getImage(e: BaseSyntheticEvent) {
    console.log(e.target.value)
    const file = e.target.files[0]
    const fileLink = URL.createObjectURL(file)
    console.log(fileLink)
    setImageShowcase(fileLink)
  }



  return (
    <div className="flex flex-row items-start justify-center gap-5">
      <input type="file" multiple onChange={(e) => getImage(e)} required className="file:font-medium file:duration-150 file:bg-blue-800 file:py-1 file:px-5 file:border-none file:text-white file:rounded-md file:shadow-2xl file:cursor-pointer file:hover:bg-blue-950" />


      {imagePrev && <Image src={imagePrev} fill alt="test" className="w-72 h-72"></Image>}

      <button className="duration-150 py-1 px-5 text-white rounded-md font-medium bg-blue-800 hover:bg-blue-950">Submit</button>
    </div>
  )
}