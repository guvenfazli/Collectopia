import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import FormLabel from "./formLabel"
import { BaseSyntheticEvent, ChangeEvent, useState, useRef } from "react"

type subCat = {
  [catName: string]: { value: string, display: string }[],
}

type ComponentProps = {
  setTagList: React.Dispatch<React.SetStateAction<string[]>>
}

export default function CategoryDate({ setTagList }: ComponentProps) {

  const tagRef = useRef<HTMLInputElement | null>(null)
  const [tagValue, setTagValue] = useState<string>("")

  const [category, setCategory] = useState([
    { category: "anime", display: "Anime" },
    { category: "music", display: "Music" },
    { category: "videogame", display: "Video Game" },
    { category: "card", display: "Cards" },
    { category: "vintagetoy", display: "Vintage Toys" },
    { category: "oldmoney", display: "Old Moneys" },
    { category: "lego", display: "Legos" },
  ])

  const [subCategory, setSubCategory] = useState<subCat>({
    anime: [
      { value: "manga", display: "Manga" }, { value: "tshirt", display: "T-Shirt" }, { value: "hoodie", display: "Hoodie" }, { value: "vintage", display: "Vintage" }, { value: "figure", display: "Figure" }, { value: "toy", display: "Toy" }
    ],
    music: [
      { value: "tshirt", display: "T-Shirt" }, { value: "hoodie", display: "Hoodie" }, { value: "vinyl", display: "Vinyl" }, { value: "cd", display: "CD" }, { value: "casette", display: "Casette" }, { value: "ticket", display: "Ticket" }, { value: "instrument", display: "Instrument" }
    ],
    videogame: [
      { value: "collectorEdition", display: "Collector Edition" }, { value: "tshirt", display: "T-Shirt" }, { value: "hoodie", display: "Hoodie" }, { value: "cd", display: "CD" }, { value: "figure", display: "Figure" }, { value: "toy", display: "Toy" }
    ],
    card: [
      { value: "yugioh", display: "Yu-Gi-Oh" }, { value: "pokemon", display: "Pokemon" }
    ],
    vintagetoy: [
      { value: "doll", display: "Dolls" }, { value: "plasticSoldier", display: "Plastic Soldiers" }, { value: "car", display: "Car" }
    ],
    oldmoney: [
      { value: "asia", display: "Asia" }, { value: "europe", display: "Europe" }, { value: "northAmerica", display: "North America" }, { value: "africa", display: "Africa" }, { value: "oceania", display: "Oceania" }, { value: "southAmerica", display: "South America" }
    ],
    lego: [
      { value: "vintageLego", display: "Vintage Lego" }, { value: "newLego", display: "New Lego" }, { value: "collectorLego", display: "Collector Lego" }, { value: "faultyProduct", display: "Faulty Product" }, { value: "limitedEdition", display: "Limited Edition" }
    ]
  })

  const [chosenCategory, setChosenCategory] = useState<string>("anime")

  function chooseCategory(e: BaseSyntheticEvent) {
    setChosenCategory(e.target.value)
  }

  function getRefValue() {
    if (tagRef.current && tagRef.current.value.length > 0) {
      setTagValue(tagRef.current.value)
    }
  }

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "," && tagRef.current && tagRef.current.value.length > 0) {
      setTagList((prev) => {
        const updated = [...prev]
        updated.push(tagValue.toLowerCase().replace(/\s/g, "").replace(",",""))
        return updated
      })
      tagRef.current.value = ""


    }
  }

  return (
    <div className="flex flex-col gap-4 items-end justify-start w-1/2">
      <div className="flex flex-row -mb-4">
        <FormLabel customFor="tags" label="Additional Tags" />
        <HoverCard>
          <HoverCardTrigger className="text-lg font-logo tracking-widest hover:underline hover:cursor-pointer">(?)</HoverCardTrigger>
          <HoverCardContent className="bg-orange-100 text-orange-800">
            Press ' , ' to add tags to your item.
          </HoverCardContent>
        </HoverCard>
      </div>
      <input name="tags" ref={tagRef} onKeyUp={(e) => addTag(e)} onChange={getRefValue}  placeholder="Additional Tags" className="shadow-sm shadow-slate-500 p-2 border border-blue-800 rounded-md w-3/4 outline-none placeholder:text-blue-300 placeholder:font-medium" />

      <FormLabel customFor="category" label="Category" />
      <select name="category" onChange={(e) => chooseCategory(e)} required className="shadow-sm shadow-slate-500 p-2 border border-blue-800 rounded-md w-3/4 outline-none">
        <option>Please Select a Category</option>
        {category.map((cat: { category: string, display: string }) => <option value={cat.category} key={cat.category}>{cat.display}</option>)}
      </select>

      <FormLabel customFor="Subcategory" label="Subcategory" />
      <select name="subcategory" required className="shadow-sm shadow-slate-500 p-2 border border-blue-800 rounded-md w-3/4 outline-none">
        <option>Please Select a Subcategory</option>
        {subCategory[chosenCategory].map((subCat: { value: string, display: string }) => <option value={subCat.value} key={subCat.value}>{subCat.display}</option>)}
      </select>
    </div>
  )
}