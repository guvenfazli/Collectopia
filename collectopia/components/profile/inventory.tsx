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
  const [inventoryNavigator, setInventoryNavigator] = useState(0)


  return (
    <div onMouseLeave={() => setIsInventory(false)} className="flex flex-col w-full items-start justify-start gap-5">
      <div className="flex flex-col w-full items-center justify-start">
        <p className="text-orange-600 text-3xl font-logo tracking-wide">Inventory  <span className="text-base">({userInventory.length})</span></p>
        {userInventory.length > 0 &&
          <div className="flex flex-row w-full justify-between items-center">
            <button disabled={inventoryNavigator === 0 || !isInventory} onClick={() => setInventoryNavigator(prev => prev -= 1)} className="py-1 px-2 duration-150 bg-orange-600 text-white shadow-md rounded-lg hover:bg-orange-700 hover:shadow-lg disabled:bg-orange-300 active:scale-95">Previous</button>
            <button disabled={inventoryNavigator === (userInventory.length / 2) - 1 || !isInventory} onClick={() => setInventoryNavigator(prev => prev += 1)} className="py-1 px-2 duration-150 bg-orange-600 text-white shadow-md rounded-lg hover:bg-orange-700 hover:shadow-lg disabled:bg-orange-300 active:scale-95">Next</button>
          </div>
        }
      </div>


      <div className="flex flex-row w-full overflow-hidden">
        <div onMouseEnter={() => setIsInventory(true)} style={{ translate: `${inventoryNavigator * -50}%` }} className={`flex flex-row h-auto items-center justify-start ${!isInventory ? 'w-44' : 'gap-5 w-full'} duration-1000`}>
          {userInventory.map((item: FetchedItemType) => <InventoryItemCard key={item._id} fetchedItem={item} isInventory={isInventory}  />)}
        </div>
      </div>
    </div>
  )
}

