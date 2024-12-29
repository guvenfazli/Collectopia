"use client"
import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "next/navigation"
import InventoryItemCard from "./inventoryItemCard"

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
  owner: string
}


type ComponentsProp = {
  userInventory: FetchedItemType[]
}

type FilteredItemsType = FetchedItemType[]

export default function UsersInventory({ userInventory }: ComponentsProp) {

  const loggedUser = useSelector((state: { auth: { userInfo: { userInfo: any } } }) => state.auth.userInfo.userInfo)
  const { userId } = useParams()
  const tagRef = useRef<HTMLInputElement>()

  const [isInventory, setIsInventory] = useState<boolean>(false)
  const [inventoryNavigator, setInventoryNavigator] = useState(0)
  const [filterTagList, setFilterTagList] = useState<string[]>([])
  const [filteredItems, setFilteredItems] = useState<FilteredItemsType>([])

  useEffect(() => {

    if (filterTagList.length === 0) {
      setFilteredItems([])
    }

  }, [filterTagList])

  function addTagForFilter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === ",") {
      setFilterTagList((prev) => {
        const updated = [...prev]
        updated.push(tagRef.current.value)
        return updated
      })
    }
  }

  function removeTag(tag: string) {
    setFilterTagList((prev) => {
      const updated = [...prev]
      const removalIndex = updated.findIndex((tagListMember) => tagListMember === tag)
      updated.splice(removalIndex, 1)
      return updated
    })
  }

  async function filterUsersInventory() { // Filters the Inventory

    try {
      const response = await fetch(`http://localhost:8080/filterUserInventory?filters=${JSON.stringify(filterTagList)}`, {
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
      console.log(err.message)
    }

  }

  return (
    <div onMouseLeave={() => setIsInventory(false)} className="flex flex-col w-full items-start justify-start gap-5">

      <div className="flex flex-col w-full items-center justify-start">
        <p className="text-orange-600 text-3xl font-logo tracking-wide">Inventory  <span className="text-base">({userInventory.length})</span></p>
        {(userInventory.length === 0 && userId === loggedUser.id) ? <p>You have no items!</p> : userId !== loggedUser.id ? <p>This user has no items</p> : userInventory.length > 0 &&
          <div className="flex flex-row w-full justify-between items-center mb-4">
            <button disabled={inventoryNavigator === 0 || !isInventory} onClick={() => setInventoryNavigator(prev => prev -= 1)} className="py-1 px-2 duration-150 bg-orange-600 text-white shadow-md rounded-lg hover:bg-orange-700 hover:shadow-lg disabled:bg-orange-300 active:scale-95">Previous</button>
            <button disabled={inventoryNavigator >= (userInventory.length / 2) - 1 || !isInventory} onClick={() => setInventoryNavigator(prev => prev += 1)} className="py-1 px-2 duration-150 bg-orange-600 text-white shadow-md rounded-lg hover:bg-orange-700 hover:shadow-lg disabled:bg-orange-300 active:scale-95">Next</button>
          </div>
        }

        <div className="flex flex-row w-full justify-start items-center gap-3">
          <p>Filter by Tag</p>
          <input ref={tagRef} placeholder="Tag" type="text" onKeyDown={(e) => addTagForFilter(e)} className="border-orange-800 border rounded-md p-1 font-general bg-orange-100 placeholder:text-orange-300 text-orange-800 outline-none" />
          {filterTagList.length === 0 ? <p>You did not add any tags for filtering.</p> : filterTagList.map((tag: string) => <p className="hover:underline hover:cursor-pointer" onClick={() => removeTag(tag)} key={tag}>{tag}</p>)}
          <button onClick={filterUsersInventory} className="border p-1 rounded-lg bg-orange-300 text-orange-800 border-orange-800 duration-150 hover:bg-orange-100">Filter</button>
        </div>
      </div>

      <div className="flex flex-row w-full  relative overflow-hidden">
        <div onMouseEnter={() => setIsInventory(true)} style={{ translate: `${inventoryNavigator * -50}%` }}
          className={`flex flex-row h-auto items-center justify-start ${!isInventory ? 'w-44' : 'gap-5 w-full'} duration-1000`}>

          {
            filteredItems.length === 0 ?
              userInventory.map((item: FetchedItemType) => <InventoryItemCard key={item._id} fetchedItem={item} isInventory={isInventory} />) :
              filteredItems.map((item: FetchedItemType) => <InventoryItemCard key={item._id} fetchedItem={item} isInventory={isInventory} />)
          }
        </div>
      </div>
    </div>
  )
}

