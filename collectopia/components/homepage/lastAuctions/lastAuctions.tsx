"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { useEffect, useState } from "react"
import AuctionCard from "../auctionCard"

type FetchedAuction = {
  auctionTag: string;
  bidList: any;
  buyout: number;
  createdAt: string;
  followers: any;
  item: string;
  minValue: number;
  deadline: number;
  seller: string;
  _id: string
}

type FetchedAuctions = FetchedAuction[]

export default function LastAuctions() {

  const [fetchedLastAuctions, setFetchedAuctions] = useState<FetchedAuctions>([])
  const [isSliding, setIsSliding] = useState<boolean>(true)

  useEffect(() => {
    async function fetchLastAuctions() {

      try {
        const response = await fetch('http://localhost:8080/fetchLastAuctions', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData)
          throw error
        }
        const resData = await response.json()



        setFetchedAuctions(resData.fetchedLastAuctions)


      } catch (err: any) {
        return;
      }
    }

    fetchLastAuctions()
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full justify-start items-center">
        <p className="text-4xl text-orange-800 font-logo tracking-widest italic">Auctions in the Last 24 Hour</p>
      </div>

      <div className="flex flex-row items-start p-3 w-full">
        {
          fetchedLastAuctions.length <= 0 ? <p className="text-lg tracking-wide italic">No Auction Created in the last 24 hours.</p> :
            <Carousel opts={{ active: isSliding }} className=" w-full">
              <CarouselContent className="">
                {fetchedLastAuctions.map((auction) =>
                  <CarouselItem className="basis-1/4" key={auction._id}>
                    <AuctionCard auction={auction} setIsSliding={setIsSliding} />
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
        }
      </div>
    </div>
  )
}