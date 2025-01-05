"use client"
import { useState, useEffect } from "react"
import MainAuctionCard from "../homepage/auctionList/mainAuctionCard"

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

export default function MyAuctions() {

  const [myAuctions, setMyAuctions] = useState<TrackingAuctionsType>([])
  const [isError, setIsError] = useState<boolean | string>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchMyAuctions() {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:8080/myActiveAuctionListing', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setMyAuctions(resData.foundAuctions)
        setIsLoading(false)
      } catch (err: any) {
        setIsError(err.message)
        setIsLoading(false)
      }
    }

    fetchMyAuctions()
  }, [])



  return (
    <div className="flex p-3 flex-col justify-start items-start w-10/12 bg-white">
      <div className="flex w-full justify-start items-start">
        <p className="text-2xl font-logo tracking-wider text-orange-800">My Active Listings <span className="text-sm">(0)</span></p>
      </div>

      <div className="flex flex-row flex-wrap items-start justify-center py-3 w-full gap-3">
        {isError && <p className="text-lg tracking-wider text-orange-800 self-center">{isError}</p>}
        {isLoading && <span id="headerLoader" className="self-center"></span>}
        {myAuctions.length > 0 && myAuctions.map((auction) => <MainAuctionCard key={auction._id} auction={auction} />)}
      </div>
    </div>
  )
}