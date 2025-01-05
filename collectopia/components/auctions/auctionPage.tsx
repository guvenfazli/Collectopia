"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AuctionItemImage from "./auctionItemImage"
import AuctionItemInformationSection from "./auctionItemInformationSection"
import AuctionBidSection from "./auctionBidSection"
import dayjs from "dayjs"
import Image from "next/image"

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


export default function AuctionMainPage() {

  const { auctionId } = useParams()
  const [fetchedAuction, setFetchedAuction] = useState<FetchedAuction | undefined>()

  useEffect(() => {
    async function fetchAuction() {
      try {
        const response = await fetch(`http://localhost:8080/fetchAuction/${auctionId}`, {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()

        setFetchedAuction(resData.fetchedAuction)
      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchAuction()
  }, [])


  console.log(fetchedAuction)

  return (
    <div className="flex p-3 flex-col justify-start items-start w-10/12 bg-white">
      {fetchedAuction &&
        <>
          <div className="flex w-full justify-start h-96 items-start gap-3 mb-2">
            <AuctionItemImage imageList={fetchedAuction!.item.imageList} />
            <AuctionItemInformationSection fetchedAuction={fetchedAuction} />
          </div>

          <div className="flex w-full justify-start h-96 items-start gap-3">
            <AuctionBidSection />
            <AuctionBidSection />
          </div>




        </>
      }

    </div>
  )
}