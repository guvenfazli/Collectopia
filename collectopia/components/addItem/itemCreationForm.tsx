import { useState } from "react"
import dayjs from "dayjs"
import TitlePrice from "./titlePrice"
import CategoryDate from "./categoryDate"
import ChooseFileAndSubmit from "./chooseFileAndSubmit"

type ComponentPropType = {
  setImageShowcase: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ItemCreationForm({ setImageShowcase }: ComponentPropType) {

  const [imagePicker, setImagePicker] = useState<FileList[]>([])
  const [datePicker, setDatePicker] = useState<string>("")
  
  async function createItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = e.target as HTMLFormElement
    const fd = new FormData(formData)
    fd.set('lastDate', datePicker)
  
    try {
      const response = await fetch('http://localhost:8080/createItem', {
        method: 'POST',
        credentials: "include",
        body: fd,
      })

      if(!response.ok){
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()

    } catch (err: any) {
      console.log(err.message)
    }
  }





  return (
    <form method="POST" onSubmit={(e) => createItem(e)} encType="multipart/form-data" className="flex flex-col w-full justify-start-start gap-4">
      <div className="flex flex-row w-full items-start">
        <TitlePrice />
        <CategoryDate setDatePicker={setDatePicker} />
      </div>
      <ChooseFileAndSubmit setImagePicker={setImagePicker} setImageShowcase={setImageShowcase} />
    </form>
  )
}