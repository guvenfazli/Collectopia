"use client"
import { useState, useEffect } from "react"
import MainAuctionCard from "../homepage/auctionList/mainAuctionCard"
import TableNavigator from "../header/tableNavigator"
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

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [fetchedTrackingList, setFetchedTrackingList] = useState<TrackingAuctionsType>([])
  const [isError, setIsError] = useState<boolean | string>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchTrackingAuctions() {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/myTrackingList?page=${currentPage}`, {
          credentials: "include"
        }
        )

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setFetchedTrackingList(resData.tracking)
        setIsError(false)
        setIsLoading(false)
      } catch (err: any) {
        setIsError(err.message)
        setIsLoading(false)
      }
    }

    fetchTrackingAuctions()
  }, [currentPage])

  return (
    <div className="flex p-3 flex-col justify-start items-start w-10/12 bg-white">
      <div className="flex w-full justify-start items-start mb-3">
        <p className="text-2xl font-logo tracking-wider text-orange-800">Tracking Auctions <span className="text-sm">({fetchedTrackingList.length})</span></p>
      </div>



      {isError &&
        <div className="flex w-full justify-center">
          <p className="text-lg tracking-wider text-orange-800 self-center">{isError}</p>
        </div>
      }

      {isLoading && <span id="headerLoader" className="self-center"></span>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start place-items-center p-3 w-full flex-wrap gap-3 justify-around min-h-[573px]">
        {!isError && fetchedTrackingList.map((auction) => <MainAuctionCard key={auction._id} auction={auction} />)}
      </div>

      <div className="flex w-full">
        <TableNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} fetchedList={fetchedTrackingList} addPage={3} isError={isError} />
      </div>
    </div>
  )
}