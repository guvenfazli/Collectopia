import { useState, useRef, BaseSyntheticEvent } from "react";
import EditFormLabel from "./editFormLabel";

type FetchedItem = {
  _id: string,
  title: string,
  minValue: number,
  buyout: number,
  category: string,
  subCategory: string,
  imageList: string[],
  tagList: string[]
  createdAt: string,
  owner: string,
  isListed: boolean
}

type ComponentProps = {
  fetchedItem: FetchedItem;
}

export default function ItemEditForm({ fetchedItem }: ComponentProps) {

  const tagRef = useRef<HTMLInputElement | null>(null)

  const [editedTagList, setEditedTagList] = useState<string[]>(fetchedItem.tagList)

  function removeTags(chosenTag: string) {
    setEditedTagList((prev) => {
      const updated = [...prev]
      const chosenIndex = updated.findIndex((tag) => tag === chosenTag)
      updated.splice(chosenIndex, 1)
      return updated
    })
  }

  function addTags(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "," && tagRef.current && tagRef.current.value.length > 0) {
      setEditedTagList((prev) => {
        const updated = [...prev]
        updated.push(tagRef.current!.value.toLowerCase())
        return updated
      })
    }
  }

  async function confirmChanges(e: BaseSyntheticEvent) {
    e.preventDefault()
    const formData = e.target as HTMLFormElement
    const fd = new FormData(formData)
    fd.delete('tagList')
    fd.append('tagList', JSON.stringify(editedTagList))

    try {
      const response = await fetch(`http://localhost:8080/editItem/${fetchedItem._id}`, {
        method: 'PATCH',
        credentials: "include",
        body: fd,
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()
      // WILL DO TOAST

    } catch (err: any) {
      console.log(err.message)
    }


  }

  return (
    <form onSubmit={(e) => confirmChanges(e)} className="flex flex-col w-full justify-start items-start gap-4" encType="multipart/form-data">
      <EditFormLabel customFor="title" label="Title" />
      <input name="title" defaultValue={fetchedItem.title} placeholder="Title" className="w-full bg-orange-300 text-orange-800 font-medium p-2 rounded-lg text-sm placeholder:text-orange-800" />
      <EditFormLabel customFor="minValue" label="Minimum Value" />
      <input name="minValue" defaultValue={fetchedItem.minValue} placeholder="Minimum Value" className="w-full bg-orange-300 text-orange-800 font-medium p-2 rounded-lg text-sm placeholder:text-orange-800" />
      <EditFormLabel customFor="buyout" label="Buyout" />
      <input name="buyout" defaultValue={fetchedItem.buyout} placeholder="Buyout" className="w-full bg-orange-300 text-orange-800 font-medium p-2 rounded-lg text-sm placeholder:text-orange-800" />
      <EditFormLabel customFor="tags" label="Tags" />
      <input onKeyDown={(e) => addTags(e)} ref={tagRef} name="tagList" placeholder="Additional Tags" className="w-full bg-orange-300 text-orange-800 font-medium p-2 rounded-lg text-sm placeholder:text-orange-800" />

      <div className="flex flex-row justify-around flex-wrap gap-3">
        {editedTagList.map((tag: string) => <p onClick={() => removeTags(tag)} className="text-sm hover:underline hover:cursor-pointer" key={tag}>#{tag}</p>)}
      </div>

      <button className="bg-orange-800 text-orange-50 px-3 py-1 rounded-md hover:bg-orange-500 duration-150 font-logo self-center tracking-widest">Confirm</button>


    </form>
  )
}