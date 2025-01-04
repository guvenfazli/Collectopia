import { useState } from "react";
import { useSelector } from "react-redux";
import AuctionImages from "./auctionImages"
import AuctionInformation from "./auctionInformation"
import dayjs from "dayjs"
import { HiOutlineScale, HiOutlineLightBulb } from "react-icons/hi";
import Link from "next/link"

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
  setIsSliding?: React.Dispatch<React.SetStateAction<boolean>>
}


export default function AuctionCard({ auction, setIsSliding }: ComponentProps) {

  const loggedInUser = useSelector((state: any) => state.auth.userInfo.userInfo)
  const [alreadyFollowed, setAlreadyFollowed] = useState<boolean>(auction.followers.some((followerId: string) => followerId === loggedInUser.id))
  const dateDataConverted = dayjs.unix(auction.deadline) // Formats the date

  async function followAuction(auctionId: string) {
    try {
      const response = await fetch(`http://localhost:8080/trackAuction/${auctionId}`, {
        method: "POST",
        credentials: "include"
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData)
        throw error
      }

      const resData = await response.json()
      // Will Add Toast


    } catch (err: any) {
      console.log(err.message)
      // Will Add Toast
    }
  }

  return (
    <div className="bg-orange-100 p-3 flex shadow-lg shadow-slate-800 flex-col border border-orange-800 rounded-lg w-full ">
      <div className="flex w-full justify-start items-center">
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
        <Link href={`/auctions/${auction._id}`} className="bg-orange-800 text-white rounded-lg p-1 hover:bg-orange-500 duration-150"><HiOutlineScale /></Link>
      </div>

      <div className="flex flex-row w-full justify-between items-center gap-1 text-gray-800 tracking-wide text-base">
        <p>{alreadyFollowed ? "Unfollow the Auction:" : "Follow the Auction:"}</p>
        <button onClick={() => followAuction(auction._id)} className="bg-orange-800 text-white rounded-lg p-1 hover:bg-orange-500 duration-150"><HiOutlineLightBulb /></button>
      </div>
    </div>
  )
}