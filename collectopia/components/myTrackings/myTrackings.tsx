"use client"
import { useState, useEffect } from "react"


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

type TrackingAuctionsType = FetchedAuction[]

export default function MyTrackings() {

  const [fetchedTrackingList, setfetchedTrackingList] = useState<TrackingAuctionsType>([])


  useEffect(() => {
    async function fetchTrackingAuctions() {
      try {
        const response = await fetch('http://localhost:8080/myTrackings', { credentials: "include" })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        console.log(resData.tracking)

      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchTrackingAuctions()
  }, [])





  return (
    <div className="flex p-3 flex-col justify-start items-start w-10/12 bg-white">
      <div className="flex w-full justify-start items-start">
        <p className="text-2xl font-logo tracking-wider text-orange-800">Tracking Auctions</p>
      </div>
      <p>Will be the page of auctions, that user follows.</p>
    </div>
  )
}