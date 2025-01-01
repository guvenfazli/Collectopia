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
        console.log(resData)

      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchLastAuctions()
  }, [])




  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full justify-start items-center">
        <p className="text-4xl text-orange-800 font-logo tracking-widest italic">Auctions in the Last 24 Hour</p>
      </div>

      <div className="flex flex-row gap-2">

      </div>

      <div className="flex flex-row border items-start p-3 w-full">
        <Carousel className="w-full">
          <CarouselContent>
            {fetchedLastAuctions.map((auction) =>
              <CarouselItem key={auction._id}>
                <AuctionCard auction={auction} />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>

      </div>
    </div>
  )
}