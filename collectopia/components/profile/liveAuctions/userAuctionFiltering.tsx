import { useRef } from "react"

type ComponentProps = {
  filterTagList: string[];
  setFilterTagList: React.Dispatch<React.SetStateAction<string[]>>;
  filterUsersAuctionList: any
}



export default function UserAuctionFiltering({ filterTagList, setFilterTagList, filterUsersAuctionList }: ComponentProps) {

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
      <input ref={tagRef} placeholder="Tag" type="text" onKeyDown={(e) => addTagForFilter(e)} className="border-blue-800 border rounded-md p-1 font-general bg-blue-100 placeholder:text-blue-300 text-blue-800 outline-none" />
      {filterTagList.length === 0 ? <p>You did not add any tags for filtering.</p> : filterTagList.map((tag: string) => <p className="hover:underline hover:cursor-pointer text-blue-400" onClick={() => removeTag(tag)} key={tag}>#{tag}</p>)}
      <button onClick={filterUsersAuctionList} className="border p-1 rounded-lg bg-blue-300 text-blue-800 border-blue-800 duration-150 hover:bg-blue-100">Filter</button>
    </div>
  )
}