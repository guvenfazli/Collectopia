import dayjs from "dayjs"
import { BaseSyntheticEvent, ChangeEvent, useState } from "react"
type FetchedItem = {
  _id: string,
  title: string,
  minValue: number,
  buyout: number,
  category: string,
  subCategory: string,
  imageList: string[],
  tagList: string[]
  createdAt: string
}

type ComponentsProp = {
  item: FetchedItem
}

export default function ItemCard({ item }: ComponentsProp) {

  const [chosenDate, setChosenDate] = useState<number>(0)
  const [isError, setIsError] = useState<boolean | string>()

  function chooseDate(e: ChangeEvent<HTMLInputElement>) {
    const chosenDate = new Date(e.target.value)
    const convertToDayJS = dayjs(chosenDate).startOf("day")
    const timestamp = convertToDayJS.unix()
    setChosenDate(timestamp)
  }



  async function createAuction(e: BaseSyntheticEvent) { // Creates auction
    e.preventDefault()
    const formData = e.target as HTMLFormElement
    const fd = new FormData(formData)
    fd.append('itemId', item._id)
    fd.delete('deadline')
    fd.append('deadline', JSON.stringify(chosenDate))

    try {
      const response = await fetch('http://localhost:8080/createAuction', {
        method: 'POST',
        credentials: 'include',
        body: fd
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData)
        throw error
      }

      const resData = await response.json()

      // Will add toast notification here.


    } catch (err: any) {
      setIsError(err.message)
    }
  }




  return (
    <form encType="multipart/form-data" onSubmit={(e) => createAuction(e)} className="flex flex-col w-full justify-start items-start font-logo tracking-widest gap-3">
      <div className="flex flex-col w-full justify-start items-start gap-1">
        <label>Minimum Value for Start</label>
        <input name="minValue" className="w-full bg-orange-300 text-orange-800 font-medium p-2 rounded-lg text-sm placeholder:text-orange-800" placeholder="Minimum Value" defaultValue={item.minValue} />

        <label>Buyout Value</label>
        <input name="buyout" className="w-full bg-orange-300 text-orange-800 font-medium p-2 rounded-lg text-sm placeholder:text-orange-800" placeholder="Buyout Value" defaultValue={item.buyout} />

        <label>Choose a Deadline</label>
        <input name="deadline" type="date" onChange={(e) => chooseDate(e)} className="w-full bg-orange-300 text-orange-800 font-medium p-2 rounded-lg text-sm placeholder:text-orange-800" />
      </div>
      <div className="flex flex-row justify-center items-center text-center w-full">
        <button className="bg-orange-800 text-orange-50 px-3 py-1 rounded-md hover:bg-orange-500 duration-150">Create Listing</button>
      </div>
    </form>
  )
}