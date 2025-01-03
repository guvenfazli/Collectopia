"use client"
import { BaseSyntheticEvent, ChangeEvent, useState, useEffect } from "react"
import dayjs from "dayjs"
import FilterAuctionList from "./filterAuctionList"
import MainAuctionCard from './mainAuctionCard'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

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
  const [page, setPage] = useState<number>(0)




  useEffect(() => {
    async function fetchAuctions() {
      try {
        const response = await fetch(`http://localhost:8080/fetchAuctions?page=${page}`, {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData)
          throw error
        }

        const resData = await response.json()
        setFetchedAuctions(resData.fetchedAuctions)

      } catch (err: any) {
        setFetchedAuctions([])

      }
    }

    if (filteredAuctions.length <= 0) {
      fetchAuctions()
    }

  }, [page])

  function navigatePage(operator: string) {
    if (operator === "forward") {
      setPage(prev => prev += 1)
    } else {
      setPage(prev => prev -= 1)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row w-full justify-start items-center">
        <p className="text-4xl text-orange-800 font-logo tracking-widest italic">Active Listings</p>
      </div>

      <FilterAuctionList setFetchedAuctions={setFetchedAuctions} setFilteredAuctions={setFilteredAuctions} />

      <div className="flex flex-row justify-between items-center -mb-8">
        <button disabled={page === 0} onClick={() => navigatePage("backward")} className="p-1 bg-orange-400 text-orange-800 rounded-3xl hover:bg-orange-800 hover:text-orange-400 duration-100 disabled:bg-orange-200 disabled:text-orange-400">
          <IoIosArrowBack />
        </button>
        <button onClick={() => navigatePage("forward")} className="p-1 bg-orange-400 text-orange-800 rounded-3xl hover:bg-orange-800 hover:text-orange-400 duration-100 disabled:bg-orange-200 disabled:text-orange-400">
          <IoIosArrowForward />
        </button>
      </div>


      <div className="flex flex-row items-start p-3 w-full flex-wrap gap-5 justify-center">
        {
          fetchedAuctions.length <= 0 ? <p>There is no active listing.</p> :
            fetchedAuctions.map((auction) => <MainAuctionCard key={auction._id} auction={auction} />)
        }
      </div>
    </div>
  )
}