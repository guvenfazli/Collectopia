"use client"
import { useState, useEffect } from "react"
import FilterAuctionList from "./filterAuctionList"
import MainAuctionCard from './mainAuctionCard'
import AuctionPaginationNavigator from "./auctionPaginationNavigator"

type subCat = {
  [catName: string]: { value: string, display: string }[],
}

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

export default function AuctionList() {

  const [fetchedAuctions, setFetchedAuctions] = useState<FetchedAuction[]>([])
  const [filteredAuctions, setFilteredAuctions] = useState<FetchedAuction[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean | string>(false)
  const [page, setPage] = useState<number>(0)




  useEffect(() => {
    async function fetchAuctions() {
      setIsError(false)
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/fetchAuctions?page=${page}`, {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setFetchedAuctions(resData.fetchedAuctions)
        setIsLoading(false)
        setIsError(false)
      } catch (err: any) {
        setIsLoading(false)
        setFilteredAuctions([])
        setIsError(err.message)
      }
    }

    fetchAuctions()

  }, [page, setPage])



  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row w-full justify-start items-center">
        <p className="text-4xl text-orange-800 font-logo tracking-widest italic">Active Listings</p>
      </div>

      <FilterAuctionList setFetchedAuctions={setFetchedAuctions} filteredAuctions={filteredAuctions} setFilteredAuctions={setFilteredAuctions} setIsLoading={setIsLoading} setIsError={setIsError} setPage={setPage} isError={isError} />

      <AuctionPaginationNavigator setPage={setPage} page={page} isError={isError} />

      {
        isLoading &&
        <div className="w-full flex justify-center items-center">
          <span id="headerLoader" className="self-center" />
        </div>
      }

      {
        isError &&
        <div className="w-full flex justify-center items-center">
          <p className="text-lg tracking-wider text-orange-800 self-center">{isError}</p>
        </div>
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start place-items-center p-3 w-full flex-wrap gap-3 justify-around min-h-[573px]">
        {
          (fetchedAuctions.length > 0 && filteredAuctions.length === 0 && !isLoading && !isError) && fetchedAuctions.map((auction) =>
            <MainAuctionCard key={auction._id} auction={auction} />)
        }

        {
          (filteredAuctions.length > 0 && !isLoading) && filteredAuctions.map((auction) =>
            <MainAuctionCard key={auction._id} auction={auction} />)
        }
      </div>

    </div>
  )
}