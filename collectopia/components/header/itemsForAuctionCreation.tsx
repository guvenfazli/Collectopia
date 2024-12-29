"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import ItemCard from "./itemCard"
import ItemImageCarousel from "./itemImageCarousel"

import { useState, useEffect } from "react"

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

type FetchedItems = FetchedItem[]

export default function ItemsForAuctionCreation() {

  const [myItems, setMyItems] = useState<FetchedItems>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean | string>(false)

  useEffect(() => {
    async function fetchMyItems() {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:8080/fetchMyItems', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setMyItems(resData.foundItems)
        setIsLoading(false)
      } catch (err: any) {
        setIsLoading(false)
        setIsError(err.message)
      }
    }

    fetchMyItems()
  }, [])





  return (
    <div className="flex flex-col justify-start items-start gap-1">
      {isError && <p>{isError}</p>}
      <div className="flex flex-col justify-start items-start w-full gap-2">
        {isLoading ? <span id="headerLoader" className="self-center"></span> : myItems.map((item) =>
          <div className="flex flex-row justify-between items-center w-full text-nowrap gap-10" key={item._id}>
            <Popover>
              <PopoverTrigger className="hover:underline font-medium">{item.title}</PopoverTrigger>
              <PopoverContent className="bg-orange-100 text-orange-800 text-lg"><ItemCard item={item} /></PopoverContent>
            </Popover>

            <p>Minimum Chosen Value: {item.minValue} $</p>
            <p>Minimum Chosen Buyout Value: {item.buyout} $</p>

            <Popover>
              <PopoverTrigger className="hover:underline font-medium">Click to see images</PopoverTrigger>
              <PopoverContent className="bg-orange-100 text-orange-800 text-lg"><ItemImageCarousel imageList={item.imageList} /></PopoverContent>
            </Popover>
          </div>
        )
        }
      </div>

    </div>
  )
}