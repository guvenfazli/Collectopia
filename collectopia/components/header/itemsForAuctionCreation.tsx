"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
      <div className="flex flex-col justify-start items-start w-full gap-2">
        {isLoading ? <span id="headerLoader" className="self-center"></span> : isError ? <p>{isError}</p> :
          <Table>
            <TableCaption>Your Items</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Min. Value</TableHead>
                <TableHead>Buyout Value</TableHead>
                <TableHead className="text-right">Images</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myItems.map((item) =>
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    <Popover>
                      <PopoverTrigger className="hover:underline font-medium">{item.title}</PopoverTrigger>
                      <PopoverContent className="bg-orange-100 text-orange-800 text-lg"><ItemCard item={item} /></PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    {item.minValue} $
                  </TableCell>
                  <TableCell>
                    {item.buyout} $
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger className="hover:underline font-medium">Click to see images</PopoverTrigger>
                      <PopoverContent className="bg-orange-100 text-orange-800 text-lg"><ItemImageCarousel imageList={item.imageList} /></PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        }
      </div>
    </div>
  )
}