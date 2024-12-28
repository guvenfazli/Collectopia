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
  const [tagList, setTagList] = useState<string[]>([])
  const [isError, setIsError] = useState<boolean | string>(false)
  const [isSuccess, setIsSuccess] = useState<boolean | string>(false)


  async function createItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = e.target as HTMLFormElement
    const fd = new FormData(formData)
    fd.append('tagList', JSON.stringify(tagList))

    try {
      const response = await fetch('http://localhost:8080/createItem', {
        method: 'POST',
        credentials: "include",
        body: fd,
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()
      setIsError(false)
      setIsSuccess(resData.message)

    } catch (err: any) {
      setIsSuccess(false)
      setIsError(err.message)
    }
  }





  return (
    <form method="POST" onSubmit={(e) => createItem(e)} encType="multipart/form-data" className="flex flex-col w-full justify-start-start gap-4">
      <div className="flex flex-row w-full items-start">
        <TitlePrice isError={isError} />
        <CategoryDate setDatePicker={setDatePicker} setTagList={setTagList} />
      </div>
      {
        isError &&
        <div className="flex flex-row justify-center items-center">
          <p className="text-lg text-red-800">{isError}</p>
        </div>
      }

      {
        isSuccess &&
        <div className="flex flex-row justify-center items-center">
          <p className="text-lg text-green-800">{isSuccess}</p>
        </div>
      }

      <div className="flex w-full gap-1 justify-center items-center">
        {tagList.length === 0 ? <p>You did not add any tags yet.</p> :
          tagList.map((tag) => <p key={tag} className="text-sm text-gray-600 font-medium hover:cursor-pointer hover:underline">#{tag}</p>)
        }
      </div>
      <ChooseFileAndSubmit setImagePicker={setImagePicker} setImageShowcase={setImageShowcase} />
    </form>
  )
}