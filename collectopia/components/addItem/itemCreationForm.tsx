import { useState } from "react"

import TitlePrice from "./titlePrice"
import CategoryDate from "./categoryDate"
import ChooseFileAndSubmit from "./chooseFileAndSubmit"

type ComponentPropType = {
  setImageShowcase: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ItemCreationForm({ setImageShowcase }: ComponentPropType) {

  const [imagePicker, setImagePicker] = useState<FileList[]>([])

  async function createItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = e.target as HTMLFormElement
    const fd = new FormData(formData)
    for (let i = 0; i < imagePicker.length; i++) {
      fd.append('imageList', imagePicker[i])
    }
    const data = Object.fromEntries(fd.entries())
  }





  return (
    <form onSubmit={(e) => createItem(e)} className="flex flex-col w-full justify-start-start gap-4">
      <div className="flex flex-row w-full items-start">
        <TitlePrice />
        <CategoryDate />
      </div>
      <ChooseFileAndSubmit setImagePicker={setImagePicker} setImageShowcase={setImageShowcase} />
    </form>
  )
}