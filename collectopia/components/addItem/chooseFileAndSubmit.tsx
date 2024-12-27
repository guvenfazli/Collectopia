import { useState } from "react"
import { BaseSyntheticEvent } from "react"

type ComponentPropType = {
  setImageShowcase: React.Dispatch<React.SetStateAction<string[]>>
  setImagePicker: React.Dispatch<React.SetStateAction<FileList[]>>
}

export default function ChooseFileAndSubmit({ setImagePicker, setImageShowcase }: ComponentPropType) {



  function getImage(e: BaseSyntheticEvent) { // Gets image for Imageshowcase
    setImageShowcase([])
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i]
      const fileLink = URL.createObjectURL(file)
      setImageShowcase((prev: string[]) => {
        const updated = [...prev]
        updated.push(fileLink)
        return updated
      })
    }

    setImagePicker(e.target.files)


  }



  return (
    <div className="flex flex-row items-start justify-center gap-5">
      <input type="file" multiple onChange={(e) => getImage(e)} required name="imageList" id="imageList" className="file:font-medium file:duration-150 file:bg-blue-800 file:py-1 file:px-5 file:border-none file:text-white file:rounded-md file:shadow-2xl file:cursor-pointer file:hover:bg-blue-950" />

      <button className="duration-150 py-1 px-5 text-white rounded-md font-medium bg-blue-800 hover:bg-blue-950">Submit</button>
    </div>
  )
}