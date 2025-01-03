"use client"
import { BaseSyntheticEvent, ChangeEvent, useState } from "react"
import dayjs from "dayjs"
import FilterAuctionList from "./filterAuctionList"

type subCat = {
  [catName: string]: { value: string, display: string }[],
}

export default function AuctionList() {

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

  const [chosenCategory, setChosenCategory] = useState<string>("anime")

  function chooseCategory(e: BaseSyntheticEvent) {
    setChosenCategory(e.target.value)
  }

  function chooseDate(e: ChangeEvent<HTMLInputElement>) {
    const chosenDate = new Date(e.target.value)
    const convertToDayJS = dayjs(chosenDate).startOf("day")
    const timestamp = convertToDayJS.unix()
    setChosenDate(timestamp)
  }



  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row w-full justify-start items-center">
        <p className="text-4xl text-orange-800 font-logo tracking-widest italic">Active Listings</p>
      </div>

      <FilterAuctionList category={category} subCategory={subCategory} chooseCategory={chooseCategory} chooseDate={chooseDate} chosenCategory={chosenCategory} />

      <div className="flex flex-row items-start p-3 w-full">

      </div>
    </div>
  )
}