import { useState } from "react";
import { useSelector } from "react-redux";
import MainAuctionImages from "./mainAuctionImages";
import MainAuctionInformation from "./mainAuctionInformation";
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
}

export default function MainAuctionCard({ auction }: ComponentProps) {
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
    <div className="bg-orange-100 p-3 flex shadow-lg shadow-gray-400/20 flex-col border border-orange-800 rounded-lg w-1/4">
      <div className="flex w-full justify-start items-center">
        <MainAuctionImages imageList={auction.item.imageList} />
      </div>

      <div className={`flex flex-col w-full p-1 gap-3 justify-start items-start duration-500`}>
        <MainAuctionInformation title={"Title"} fetchedItemInfo={auction.item.title} />
        <MainAuctionInformation title={"Min. Bid Value"} fetchedItemInfo={auction.minValue + ' $'} />
        <MainAuctionInformation title={"Buyout"} fetchedItemInfo={auction.buyout + ' $'} />
        <MainAuctionInformation title={"Tags"} tagList={auction.item.tagList} />
        <MainAuctionInformation fetchedItemInfo={dayjs(dateDataConverted).format("DD/MM/YYYY")} title="Deadline" />
      </div>

      <div className="flex flex-col  items-start justify-start gap-3">
        <div className="flex flex-row w-full justify-between items-center text-gray-800 tracking-wide mb- text-base">
          <p>See the Auction:</p>
          <Link href={`/auctions/${auction._id}`} className="bg-orange-800 text-white rounded-lg p-1 hover:bg-orange-500 duration-150"><HiOutlineScale /></Link>
        </div>

        {loggedInUser.id !== auction.item.owner &&
          <div className="flex flex-row w-full justify-between items-center text-gray-800 tracking-wide text-base">
            <p>{alreadyFollowed ? "Unfollow the Auction:" : "Follow the Auction:"}</p>
            <button onClick={() => followAuction(auction._id)} className="bg-orange-800 text-white rounded-lg p-1 hover:bg-orange-500 duration-150"><HiOutlineLightBulb /></button>
          </div>
        }
      </div>
    </div>
  )
}