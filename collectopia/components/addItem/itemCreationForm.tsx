import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Socket } from "socket.io-client"
import TitlePrice from "./titlePrice"
import CategoryDate from "./categoryDate"
import ChooseFileAndSubmit from "./chooseFileAndSubmit"

type ComponentPropType = {
  setImageShowcase: React.Dispatch<React.SetStateAction<string[]>>;
  socket: Socket | undefined;

}

export default function ItemCreationForm({ setImageShowcase, socket }: ComponentPropType) {

  const [imagePicker, setImagePicker] = useState<FileList[]>([])
  const [tagList, setTagList] = useState<string[]>([])
  const [isError, setIsError] = useState<boolean | string>(false)

  const { toast } = useToast()

  function removeTag(chosenTag: string) {
    setTagList((prev) => {
      const updated = [...prev]
      const chosenTagIndex = updated.findIndex((tag) => tag === chosenTag)
      updated.splice(chosenTagIndex, 1)
      return updated;
    })
  }

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
      socket?.emit('itemAdded')
      toast({
        title: 'Success!',
        description: resData.message,
        className: "bg-green-500 border-none text-white text-xl"
      })
    } catch (err: any) {
      toast({
        title: 'Error!',
        description: err.message,
        className: "bg-red-500 border-none text-white text-xl"
      })
    }
  }

  return (
    <form method="POST" onSubmit={(e) => createItem(e)} encType="multipart/form-data" className="flex flex-col w-full justify-start-start gap-4">
      <div className="flex flex-row w-full items-start">
        <TitlePrice />
        <CategoryDate setTagList={setTagList} />
      </div>

      <div className="flex w-full gap-1 justify-center items-center flex-wrap">
        {tagList.length === 0 ? <p>You did not add any tags yet.</p> :
          tagList.map((tag) => <p key={tag} onClick={() => removeTag(tag)} className="text-sm text-gray-600 font-medium hover:cursor-pointer hover:underline">#{tag}</p>)
        }
      </div>
      <ChooseFileAndSubmit setImagePicker={setImagePicker} setImageShowcase={setImageShowcase} />
    </form>
  )
}