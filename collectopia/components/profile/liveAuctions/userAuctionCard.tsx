import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client"
import { useToast } from "@/hooks/use-toast";
import { HiOutlineScale, HiOutlineLightBulb } from "react-icons/hi";
import { useSelector } from "react-redux";
import UserAuctionCardImageSlider from "./userAuctionCardImageSlider";
import CardInformation from "../cardInformation"
import dayjs from "dayjs"
import Link from "next/link";
import Image from "next/image"

type FetchedAuction = {
  _id: string,
  minValue: number,
  buyout: number,
  deadline: number,
  createdAt: string,
  followers: string[],
  item: any
  isSold: boolean
}

type ComponentsProps = {
  auction: FetchedAuction;
  isListing: boolean;
  index: number;
  socket: Socket | undefined;
}

export default function UserAuctionCard({ auction, isListing, index, socket }: ComponentsProps) {

  const loggedInUser = useSelector((state: any) => state.auth.userInfo.userInfo)
  const todaysDate = dayjs(new Date())
  const deadlineDate = dayjs.unix(auction.deadline)
  const diff = deadlineDate.diff(todaysDate, 'hour', true)
  const dateDataConverted = dayjs.unix(auction.deadline) // Formats the date
  const { toast } = useToast()
  const [alreadyFollowed, setAlreadyFollowed] = useState<boolean>(auction.followers.some((followerId) => followerId === loggedInUser.id))
  const [auctionClosed, setAuctionClosed] = useState<boolean>(Math.round(diff) <= 0 || auction.isSold === true)

  useEffect(() => { // Trigger for refreshing the alreadyFollowed state.
    setAlreadyFollowed(auction.followers.some((followerId) => followerId === loggedInUser.id))
  }, [auction])

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
      socket?.emit('profileUpdateTrigger')
      toast({
        title: 'Success!',
        description: resData.message,
        className: "bg-green-500 border-none text-white text-xl"
      })
    } catch (err: any) {
      toast({
        title: 'Error!',
        description: err.message,
        className: "bg-red-500 border-none text-white text-xl"
      })
    }
  }

  return (
    <div className={`flex bg-blue-200 text-nowrap overflow-hidden duration-700 ease-in-out relative z-40 flex-shrink-0 border border-blue-300 h-full flex-col items-start justify-start shadow-slate-800 shadow-xl z-${index} rounded-lg ${!isListing ? '-mr-20 w-full' : 'mr-0 w-1/4'}`}>

      {auctionClosed &&
        <div className="top-0 flex flex-row justify-center items-center absolute bottom-0 z-20 group left-0 right-0 bg-white/70 hover:bg-white/0 duration-100">
          <p className={`-rotate-90 text-9xl font-logo text-blue-600 opacity-100 duration-100 group-hover:opacity-0`}>SOLD!</p>
        </div>
      }

      <div className={`flex w-full items-start mb-4 min-h-44 overflow-hidden relative ${!isListing ? 'mb-0' : 'mb-4'}`}>
        <UserAuctionCardImageSlider fetchedAuctionImage={auction.item.imageList} isListing={isListing} />
      </div>

      <div className={`flex flex-col w-full p-1 gap-3 justify-start items-start duration-500 ${!isListing ? 'h-0 p-0' : 'h-96'}`}>
        <CardInformation fetchedItemInfo={auction.item.title} title="Title" auction={true} />
        <CardInformation fetchedItemInfo={auction.minValue + ' $'} title="Minimum Auction Value" auction={true} />
        <CardInformation fetchedItemInfo={auction.buyout + ' $'} title="Buyout Value" auction={true} />
        <CardInformation tagList={auction.item.tagList} title="Tags" auction={true} />
        <CardInformation fetchedItemInfo={dayjs(dateDataConverted).format("DD/MM/YYYY")} title="Deadline" auction={true} />

        <div className="flex flex-col w-full items-start justify-start ">
          <div className="flex flex-row w-full justify-between items-center text-gray-800 tracking-wide text-base mb-1">
            <p>See the Auction:</p>
            <Link href={`/auctions/${auction._id}`} className="bg-blue-800 text-white rounded-lg p-1 hover:bg-blue-500 duration-150"><HiOutlineScale /></Link>
          </div>

          {(loggedInUser.id !== auction.item.owner && !auction.isSold) &&
            <div className="flex flex-row w-full justify-between items-center text-gray-800 tracking-wide text-base">
              <p>{alreadyFollowed ? "Unfollow the Auction:" : "Follow the Auction:"}</p>
              <button onClick={() => followAuction(auction._id)} className="bg-blue-800 text-white rounded-lg p-1 hover:bg-blue-500 duration-150">
                <HiOutlineLightBulb />
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}