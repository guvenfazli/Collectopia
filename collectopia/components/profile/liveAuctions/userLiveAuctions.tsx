"use client"

import { useState } from "react"
import UserAuctionCard from "./userAuctionCard"
import UserAuctionFiltering from "./userAuctionFiltering"

type FetchedAuction = {
  _id: string,
  minValue: number,
  buyout: number,
  deadline: number,
  createdAt: string,
  followers: string[],
  item: any
}


type ComponentsProp = {
  userAuctions: FetchedAuction[]
}




export default function UserLiveAuctions({ userAuctions }: ComponentsProp) {

  const [isListing, setIsListing] = useState<boolean>(false)
  const [listingNavigator, setListingNavigator] = useState<number>(0)
  const [filterTagList, setFilterTagList] = useState<string[]>([])
  const [filteredUserAuctions, setFilteredUserAuctions] = useState<FetchedAuction[]>([])

  async function filterUsersAuctionList() { // Filters the Inventory

    try {
      const response = await fetch(`http://localhost:8080/filterUserAuction?filters=${JSON.stringify(filterTagList)}`, {
        credentials: "include"
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData)
        throw error
      }

      const resData = await response.json()

      setFilteredUserAuctions(resData.filteredItems)


    } catch (err: any) {
      console.log(err.message)
    }

  }


  return (
    <div onMouseLeave={() => setIsListing(false)} className="flex flex-col w-full items-start justify-start gap-5">

      <div className="flex flex-col w-full items-center justify-start">
        <p className="text-blue-600 text-3xl font-logo tracking-wide">Active Listings <span className="text-base">({userAuctions.length})</span></p>
        <UserAuctionFiltering filterTagList={filterTagList} setFilterTagList={setFilterTagList} filterUsersAuctionList={filterUsersAuctionList} />
      </div>

      <div className="flex flex-row w-full  relative overflow-hidden">
        <div onMouseEnter={() => setIsListing(true)} style={{ translate: `${listingNavigator * -50}%` }} className={`flex flex-row h-auto items-center justify-start ${!isListing ? 'w-44' : 'gap-5 w-full'} duration-1000`}>
          {
            filteredUserAuctions.length === 0 ?
              userAuctions.map((auction: FetchedAuction) => <UserAuctionCard key={auction._id} auction={auction} isListing={isListing} />) :
              filteredUserAuctions.map((auction: FetchedAuction) => <UserAuctionCard key={auction._id} auction={auction} isListing={isListing} />)
          }
        </div>

      </div>
    </div>
  )
}