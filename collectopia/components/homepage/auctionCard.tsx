import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import AuctionImages from "./auctionImages"
import AuctionInformation from "./auctionInformation"
import dayjs from "dayjs"
import { HiOutlineScale } from "react-icons/hi";
import Link from "next/link"
import { useState } from "react";


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

type ComponentProps = {
  auction: FetchedAuction
  setIsSliding: React.Dispatch<React.SetStateAction<boolean>>
}


export default function AuctionCard({ auction, setIsSliding }: ComponentProps) {

  const dateDataConverted = dayjs.unix(auction.deadline) // Formats the date

  return (
    <div className="bg-lime-100 p-3 flex shadow-lg shadow-slate-800 flex-col border border-green-800 rounded-lg w-1/4">
      <div className="flex flex-row w-full">
        <AuctionImages imageList={auction.item.imageList} setIsSliding={setIsSliding} />
      </div>

      <div className={`flex flex-col w-full p-1 gap-3 justify-start items-start duration-500`}>
        <AuctionInformation title={"Title"} fetchedItemInfo={auction.item.title} />
        <AuctionInformation title={"Min. Bid Value"} fetchedItemInfo={auction.minValue + ' $'} />
        <AuctionInformation title={"Buyout"} fetchedItemInfo={auction.buyout + ' $'} />
        <AuctionInformation title={"Tags"} tagList={auction.item.tagList} />
        <AuctionInformation fetchedItemInfo={dayjs(dateDataConverted).format("DD/MM/YYYY")} title="Deadline" />
      </div>

      <div className="flex flex-row w-full justify-between items-center gap-1 text-gray-800 tracking-wide text-base">
        <p>See the Auction:</p>
        <Link href={`/auctions/${auction._id}`} className="bg-green-800 text-white rounded-lg p-1 hover:bg-green-500 duration-150"><HiOutlineScale /></Link>
      </div>
    </div>
  )
}