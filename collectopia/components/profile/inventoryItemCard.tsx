import { useState } from "react"
import { HiArrowSmallRight } from "react-icons/hi2";
import { HiArrowSmallLeft } from "react-icons/hi2";
import CardInformation from "./cardInformation"
import Image from "next/image"
import dayjs from "dayjs"
type FetchedItem = {
  _id: string,
  title: string,
  minValue: number,
  buyout: number,
  category: string,
  subCategory: string,
  imageList: string[],
  tagList: string[]
  createdAt: string
}

type ComponentsProp = {
  fetchedItem: FetchedItem;
  isInventory: boolean;
}


export default function InventoryItemCard({ fetchedItem, isInventory }: ComponentsProp) {

  const [imageNavigator, setImageNavigator] = useState(0)

  const createdDate = new Date(fetchedItem.createdAt)
  const dateDataConverted = dayjs(createdDate) // Formats the date

  return (
    <div className={`flex bg-orange-200 text-nowrap overflow-hidden duration-700 ease-in-out flex-shrink-0 border border-orange-300 h-full flex-col items-start justify-start shadow-slate-800 shadow-xl ${!isInventory ? '-mr-20 w-full' : 'mr-0 w-1/3'}`}>
      <div className="flex w-full items-start mb-4 min-h-72 pt-4 overflow-hidden relative">
        {fetchedItem.imageList.map((img: string) =>
          <div key={img} style={{ translate: `${imageNavigator * -100}%` }} className="flex w-full h-full overflow-hidden flex-shrink-0 duration-700">
            {<Image
              fill
            
              alt="uploadedImage"
              style={{ zIndex: 0, transitionDuration: "700ms"}}
              src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}>
            </Image>}
          </div>
        )}
      </div>

      <div className="flex flex-row w-full p-1 justify-between items-center">
        <button onClick={() => setImageNavigator(prev => prev -= 1)} disabled={imageNavigator === 0 || fetchedItem.imageList.length === 0} className="bg-orange-600 text-white font-semibold py-1 px-1 rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg active:scale-95 transition-transform duration-150 ease-in-out disabled:bg-orange-300"><HiArrowSmallLeft /></button>
        <button onClick={() => setImageNavigator(prev => prev += 1)} disabled={imageNavigator === fetchedItem.imageList.length - 1 || fetchedItem.imageList.length === 0} className="bg-orange-600 text-white font-semibold py-1 px-1 rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg active:scale-95 transition-transform duration-150 ease-in-out disabled:bg-orange-300"><HiArrowSmallRight /></button>
      </div>

      <div className="flex flex-col w-full p-1 gap-3 justify-start items-start">
        <CardInformation fetchedItemInfo={fetchedItem.title} title="Title" />
        <CardInformation fetchedItemInfo={fetchedItem.minValue + ' $'} title="Minimum Auction Value" />
        <CardInformation fetchedItemInfo={fetchedItem.buyout + ' $'} title="Buyout Value" />
        <CardInformation fetchedItemInfo={fetchedItem.category} title="Category" />
        <CardInformation fetchedItemInfo={fetchedItem.subCategory} title="Subcategory" />
        <CardInformation tagList={fetchedItem.tagList} title="Tags" />
        <CardInformation fetchedItemInfo={dateDataConverted.format("DD/MM/YYYY")} title="Created At" />
      </div>
    </div>
  )
}