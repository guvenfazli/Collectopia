"use client"
import { useState } from "react"
import InventoryItemCard from "./inventoryItemCard"

type FetchedItemType = {
  _id: string,
  title: string,
  minValue: number,
  buyout: number,
  category: string,
  subCategory: string,
  imageList: string[],
  createdAt: string
}


type ComponentsProp = {
  userInventory: FetchedItemType[]
}

export default function UsersInventory({ userInventory }: ComponentsProp) {

  const [isInventory, setIsInventory] = useState<boolean>(false)


  return (
    <div onMouseLeave={() => setIsInventory(false)}  className="flex flex-col border border-black w-full items-start justify-start gap-5">
      <div className="flex flex-row items-center justify-start">
        <p className="text-orange-600 text-3xl font-logo tracking-wide">Inventory</p>
      </div>

      <div onMouseEnter={() => setIsInventory(true)} className={`flex border border-red-800 flex-row h-auto items-center justify-start overflow-x-hidden ${!isInventory ? 'w-44' :'gap-5 w-full'} duration-700`}>
        {userInventory.map((item: FetchedItemType) => <InventoryItemCard key={item._id} fetchedItem={item} isInventory={isInventory} setIsInventory={setIsInventory} />)}
      </div>
    </div>
  )
}

/* min-h-96 */