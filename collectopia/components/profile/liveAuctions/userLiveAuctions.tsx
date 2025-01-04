"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import UserAuctionCard from "./userAuctionCard"
import UserAuctionFiltering from "./userAuctionFiltering"
import UserAuctionNavigator from "./userAuctionNavigator"

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
  const { userId } = useParams()
  const loggedUser = useSelector((state: { auth: { userInfo: { userInfo: any } } }) => state.auth.userInfo.userInfo)
  const [isListing, setIsListing] = useState<boolean>(false)
  const [listingNavigator, setListingNavigator] = useState<number>(0)
  const [filterTagList, setFilterTagList] = useState<string[]>([])
  const [filteredUserAuctions, setFilteredUserAuctions] = useState<FetchedAuction[]>([])
  const [isError, setIsError] = useState<boolean | string>(false)

  const todaysDate = dayjs(new Date()).unix()
  const stillActive = userAuctions.filter((auction) => auction.deadline > todaysDate)
  
  
  useEffect(() => {
    if (filterTagList.length === 0) {
      setFilteredUserAuctions([])
    }
  }, [filterTagList])

  async function filterUsersAuctionList() { // Filters the Inventory

    try {
      const response = await fetch(`http://localhost:8080/filterUserAuction/${userId}?filters=${JSON.stringify(filterTagList)}`, {
        credentials: "include"
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()

      setFilteredUserAuctions(resData.filteredAuctions)

    } catch (err: any) {
      setIsError(err.message)
      setFilteredUserAuctions([])
      setTimeout(() => {
        setIsError(false)
        setFilteredUserAuctions([])
      }, 2000)
    }

  }


  return (
    <div onMouseLeave={() => setIsListing(false)} className="flex flex-col w-full items-start justify-start gap-5">

      <div className="flex flex-col w-full items-center justify-start">
        <p className="text-blue-600 text-3xl font-logo tracking-wide">Active Listings <span className="text-base">({stillActive.length})</span></p>
        <UserAuctionNavigator auctionLength={userAuctions.length} userId={userId} loggedUserId={loggedUser.id} listingNavNumber={listingNavigator} setListingNavigator={setListingNavigator} isListing={isListing} />

        {userAuctions.length > 0 &&
          <UserAuctionFiltering filterTagList={filterTagList} setFilterTagList={setFilterTagList} filterUsersAuctionList={filterUsersAuctionList} />
        }
      </div>

      <div className="flex flex-row w-full  relative overflow-hidden">

        <div onClick={() => setIsListing(true)} style={{ translate: `${listingNavigator * -50}%` }} className={`flex flex-row h-auto items-center justify-start ${!isListing ? 'w-44' : 'gap-5 w-full'} duration-1000 hover:cursor-pointer`}>
          {
            (filteredUserAuctions.length === 0 && !isError) ?
              userAuctions.map((auction: FetchedAuction) => <UserAuctionCard key={auction._id} auction={auction} isListing={isListing} />) :
              filteredUserAuctions.map((auction: FetchedAuction) => <UserAuctionCard key={auction._id} auction={auction} isListing={isListing} />)
          }
        </div>
      </div>

      {
        isError &&
        <div className="flex w-full justify-center items-center">
          <p className="self-center">{isError}</p>
        </div>
      }
    </div>
  )
}