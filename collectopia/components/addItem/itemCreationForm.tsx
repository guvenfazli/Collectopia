import { useState } from "react"

import TitlePrice from "./titlePrice"
import CategoryDate from "./categoryDate"
import ChooseFileAndSubmit from "./chooseFileAndSubmit"
export default function ItemCreationForm({ setImageShowcase }) {

  const [imagePicker, setImagePicker] = useState()


  async function createItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = e.target as HTMLFormElement

    const fd = new FormData(formData)
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