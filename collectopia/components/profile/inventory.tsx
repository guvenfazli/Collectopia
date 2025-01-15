"use client"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import InventoryItemCard from "./inventoryItemCard"
import InventoryFiltering from "./inventoryFiltering"
import InventoryNavigator from "./inventoryNavigator"

type FetchedItemType = {
  _id: string,
  title: string,
  minValue: number,
  buyout: number,
  category: string,
  subCategory: string,
  imageList: string[],
  tagList: string[],
  createdAt: string,
  owner: string,
  isListed: boolean
}


type ComponentsProp = {
  userInventory: FetchedItemType[]
}

type FilteredItemsType = FetchedItemType[]

export default function UsersInventory({ userInventory }: ComponentsProp) {

  const loggedUser = useSelector((state: { auth: { userInfo: { userInfo: any } } }) => state.auth.userInfo.userInfo)
  const { userId } = useParams()
  const { toast } = useToast()

  const [isInventory, setIsInventory] = useState<boolean>(false)
  const [inventoryNavigator, setInventoryNavigator] = useState(0)
  const [filterTagList, setFilterTagList] = useState<string[]>([])
  const [filteredItems, setFilteredItems] = useState<FilteredItemsType>([])

  useEffect(() => {
    if (filterTagList.length === 0) {
      setFilteredItems([])
    }
  }, [filterTagList])



  async function filterUsersInventory() { // Filters the Inventory

    try {
      const response = await fetch(`http://localhost:8080/filterUserInventory/${userId}?filters=${JSON.stringify(filterTagList)}`, {
        credentials: "include"
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData)
        throw error
      }

      const resData = await response.json()

      setFilteredItems(resData.filteredItems)


    } catch (err: any) {
      toast({
        title: 'Error!',
        description: err.message,
        className: "bg-red-500 border-none text-white text-xl"
      })
    }
  }

  return (
    <div onMouseLeave={() => setIsInventory(false)} className="flex flex-col w-full items-start justify-start rounded-md gap-5">

      <div className="flex flex-col w-full items-center justify-start">
        <p className="text-orange-600 text-3xl font-logo tracking-wide">Inventory  <span className="text-base">({userInventory.length})</span></p>
        <InventoryNavigator
          inventoryLength={userInventory.length} userId={userId} loggedUserId={loggedUser.id} inventoryNavNumber={inventoryNavigator} setInventoryNavigator={setInventoryNavigator} isInventory={isInventory} />

        {
          userInventory.length > 0 && <InventoryFiltering filterTagList={filterTagList} setFilterTagList={setFilterTagList} filterUsersInventory={filterUsersInventory} />
        }

      </div>

      <div className="flex flex-row w-full rounded-md relative overflow-hidden">
        <div onMouseEnter={() => setIsInventory(true)} style={{ translate: `${inventoryNavigator * -35}%` }}
          className={`flex flex-row h-auto items-center justify-start ${!isInventory ? 'w-44' : 'gap-5 w-full'} duration-1000`}>
          {
            filteredItems.length === 0 ?
              userInventory.map((item: FetchedItemType, i: number) => <InventoryItemCard key={item._id} fetchedItem={item} isInventory={isInventory} index={i} />) :
              filteredItems.map((item: FetchedItemType, i: number) => <InventoryItemCard key={item._id} fetchedItem={item} isInventory={isInventory} index={i} />)
          }
        </div>
      </div>
    </div>
  )
}

