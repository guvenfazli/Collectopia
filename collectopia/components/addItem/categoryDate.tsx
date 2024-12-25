"use client"
import { BaseSyntheticEvent, useState } from "react"

export default function CategoryDate() {

  const [category, setCategory] = useState([
    { category: "anime", display: "Anime", subCategories: ["Manga", "T-Shirt", "Hoodie", "Vintage", "Figure", "Toy"] },
    { category: "music", display: "Music", subCategories: ["T-Shirt", "Hoodie", "Vinyl", "CD", "Casette", "Ticket", "Instrument"] },
    { category: "videogame", display: "Video Game", subCategories: ["Collector Edition", "T-Shirt", "Hoodie", "CD", "Figure", "Toy"] },
    { category: "card", display: "Cards", subCategories: ["Yu-Gi-Oh", "Pokemon"] },
    { category: "vintagetoy", display: "Vintage Toys", subCategories: ["Dolls", "Plastic Soldiers", "Figure", "Car"] },
    { category: "oldmoney", display: "Old Moneys", subCategories: ["Asia", "Europe", "North America", "Africa", "Oceania", "South America"] },
    { category: "lego", display: "Legos", subCategories: ["Vintage Lego", "New Lego", "Collector Lego", "Faulty Product", "Limited Edition"] },
  ])

  const [subCategory, setSubCategory] = useState({
    anime: [
      { value: "manga", display: "Manga" }, { value: "tshirt", display: "T-Shirt" }, { value: "hoodie", display: "Hoodie" }, { value: "vintage", display: "Vintage" }, { value: "figure", display: "Figure" }, { value: "toy", display: "Toy" }
    ],
    music: [
      { value: "tshirt", display: "T-Shirt" }, { value: "hoodie", display: "Hoodie" }, { value: "vinyl", display: "Vinyl" }, { value: "cd", display: "CD" }, { value: "casette", display: "Casette" }, { value: "ticket", display: "Ticket" }, { value: "instrument", display: "Instrument" }
    ],
    videogame: [
      { value: "collectorEdition", display: "Collector Edition" }, { value: "tshirt", display: "T-Shirt" }, { value: "hoodie", display: "Hoodie" }, { value: "cd", display: "CD" }, { value: "figure", display: "Figure" }, { value: "toy", display: "Toy" }
    ],
    card: [{ value: "yugioh", display: "Yu-Gi-Oh" }, { value: "pokemon", display: "Pokemon" }],
    vintagetoy: [{ value: "doll", display: "Dolls" }, { value: "plasticSoldier", display: "Plastic Soldiers" }, { value: "car", display: "Car" }],
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

  return (
    <div className="flex flex-col gap-4 items-end justify-start w-1/2">
      <input type="date" required placeholder="Choose Last Date" name="title" className="p-2 border border-blue-800 rounded-md w-3/4 outline-none placeholder:text-blue-300 placeholder:font-medium" />

      <select onChange={(e) => chooseCategory(e)} required className="p-2 border border-blue-800 rounded-md w-3/4 outline-none">
        <option>Please Select a Category</option>
        {category.map((cat) => <option value={cat.category} key={cat.category}>{cat.display}</option>)}
      </select>

      <select required className="p-2 border border-blue-800 rounded-md w-3/4 outline-none">
        <option>Please Select a Category</option>
        {subCategory[chosenCategory].map((subCat) => <option value={subCat.value} key={subCat.value}>{subCat.display}</option>)}
      </select>
    </div>
  )
}