import { BaseSyntheticEvent, ChangeEvent, useState } from "react"
import dayjs from "dayjs"

type Category = {
  category: string, display: string
}

type subCat = {
  [catName: string]: { value: string, display: string }[],
}

type FetchedAuction = {
  auctionTag: string;
  bidList: any;
  deadline: number;
  buyout: number;
  createdAt: string;
  followers: any;
  item: any;
  minValue: number;
  seller: string;
  _id: string
}



type ComponentProps = {
  setFetchedAuctions: React.Dispatch<React.SetStateAction<FetchedAuction[]>>
}




export default function FilterAuctionList({ setFetchedAuctions }: ComponentProps) {

  const [chosenDate, setChosenDate] = useState<number>(0)
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

  const [chosenCategory, setChosenCategory] = useState<string | undefined>(undefined)
  const [chosenSubCategory, setChosenSubCategory] = useState<string | null>()


  function chooseCategory(e: BaseSyntheticEvent) {
    setChosenCategory(e.target.value)
  }

  function chooseSubCategory(e: BaseSyntheticEvent) {
    setChosenSubCategory(e.target.value)
  }

  function chooseDate(e: ChangeEvent<HTMLInputElement>) {
    const chosenDate = new Date(e.target.value)
    const convertToDayJS = dayjs(chosenDate).startOf("day")
    const timestamp = convertToDayJS.unix()
    setChosenDate(timestamp)
  }

  async function filterAuctionList(e: BaseSyntheticEvent) {
    e.preventDefault()

    const formData = e.target as HTMLFormElement
    const fd = new FormData(formData)
    fd.delete('deadline')
    fd.append('deadline', JSON.stringify(chosenDate))



    try {
      const response = await fetch(`http://localhost:8080/filterAuctions?category=${chosenCategory}&subCategory=${chosenSubCategory}&deadline=${chosenDate}`)

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData)
        throw error
      }



    } catch (err: any) {
      console.log(err.message)
    }
  }

  return (
    <form onSubmit={(e) => filterAuctionList(e)} className="flex flex-row gap-2">
      <select name="category" onChange={(e) => chooseCategory(e)} required className="shadow-sm shadow-slate-500 p-2 border border-orange-800 rounded-md outline-none">
        <option value={undefined}>Please Select a Category</option>
        {category.map((cat: { category: string, display: string }) => <option value={cat.category} key={cat.category}>{cat.display}</option>)}
      </select>

      <select onChange={(e) => chooseSubCategory(e)} name="subcategory" required className="shadow-sm shadow-slate-500 p-2 border border-orange-800 rounded-md outline-none">
        <option >Please Select a Subcategory</option>
        {chosenCategory !== undefined && subCategory[chosenCategory].map((subCat: { value: string, display: string }) => <option value={subCat.value} key={subCat.value}>{subCat.display}</option>)}
      </select>

      <input placeholder="Additional Tag" className="border border-orange-800 px-2 bg-orange-300 placeholder:text-orange-200 rounded-md" />

      <input name="deadline" type="date" onChange={(e) => chooseDate(e)} className="bg-orange-300 text-orange-800 font-medium p-2 rounded-lg text-sm placeholder:text-orange-800 outline-none" />

      <button className="bg-orange-800 text-orange-50 px-5 py-1 rounded-md hover:bg-orange-300 hover:text-orange-800 duration-150 font-logo tracking-widest">
        Filter
      </button>

      <button className="bg-orange-800 text-orange-50 px-5 py-1 rounded-md hover:bg-orange-300 hover:text-orange-800 duration-150 font-logo tracking-widest">
        Clear Filter
      </button>
    </form>
  )
}