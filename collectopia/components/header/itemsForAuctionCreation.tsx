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

import TableNavigator from "./tableNavigator"
import { Socket } from "socket.io-client"
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

type ComponentProps = {
  socket: Socket | undefined
  setIsCreateAuction: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ItemsForAuctionCreation({ socket, setIsCreateAuction }: ComponentProps) {

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [myItems, setMyItems] = useState<FetchedItems>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean | string>(false)

  useEffect(() => {
    async function fetchMyItems() {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/fetchMyItems?page=${currentPage}`, {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setMyItems(resData.foundItems)
        setIsError(false)
        setIsLoading(false)
      } catch (err: any) {
        setIsLoading(false)
        setIsError(err.message)
      }
    }

    fetchMyItems()
  }, [currentPage])

  return (
    <div className="flex flex-col justify-start items-start gap-1">
      <div className="flex flex-col justify-start items-start w-full gap-2">
        {isLoading ? <span id="headerLoader" className="self-center"></span> :
          <Table>
            <TableCaption>
              <TableNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} fetchedList={myItems} isError={isError} addPage={1} />
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Min. Value</TableHead>
                <TableHead>Buyout Value</TableHead>
                <TableHead className="text-right">Images</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isError ?
                <TableRow className="text-left">
                  <TableCell>
                    {isError}
                  </TableCell>
                </TableRow> :

                myItems.map((item) =>
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      <Popover>
                        <PopoverTrigger className="hover:underline font-medium">{item.title}</PopoverTrigger>
                        <PopoverContent className="bg-orange-100 text-orange-800 text-lg">
                          <ItemCard item={item} socket={socket} setIsCreateAuction={setIsCreateAuction} />
                        </PopoverContent>
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