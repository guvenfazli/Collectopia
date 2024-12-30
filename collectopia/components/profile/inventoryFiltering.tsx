import { useRef } from "react"

type ComponentProps = {
  filterTagList: string[],
  setFilterTagList: React.Dispatch<React.SetStateAction<string[]>>;
  filterUsersInventory: any
}




export default function InventoryFiltering({ filterTagList, setFilterTagList, filterUsersInventory }: ComponentProps) {

  const tagRef = useRef<HTMLInputElement | null>(null)

  function addTagForFilter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "," && tagRef.current && tagRef.current.value.length > 0) {
      setFilterTagList((prev) => {
        const updated = [...prev]
        updated.push(tagRef.current!.value)
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



  return (
    <div className="flex flex-row w-full justify-start items-center gap-3">
      <p>Filter by Tag</p>
      <input ref={tagRef} placeholder="Tag" type="text" onKeyDown={(e) => addTagForFilter(e)} className="border-orange-800 border rounded-md p-1 font-general bg-orange-100 placeholder:text-orange-300 text-orange-800 outline-none" />
      {filterTagList.length === 0 ? <p>You did not add any tags for filtering.</p> : filterTagList.map((tag: string) => <p className="hover:underline hover:cursor-pointer" onClick={() => removeTag(tag)} key={tag}>{tag}</p>)}
      <button onClick={filterUsersInventory} className="border p-1 rounded-lg bg-orange-300 text-orange-800 border-orange-800 duration-150 hover:bg-orange-100">Filter</button>
    </div>
  )
}