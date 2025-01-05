import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { useState } from "react";
import { HiOutlineScale, HiOutlineLightBulb } from "react-icons/hi";
import { useSelector } from "react-redux";
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
}

type ComponentsProps = {
  auction: FetchedAuction;
  isListing: boolean
}

export default function UserAuctionCard({ auction, isListing }: ComponentsProps) {

  const loggedInUser = useSelector((state: any) => state.auth.userInfo.userInfo)
  const todaysDate = dayjs(new Date())
  const deadlineDate = dayjs.unix(auction.deadline)
  const diff = deadlineDate.diff(todaysDate, 'hour', true)
  const dateDataConverted = dayjs.unix(auction.deadline) // Formats the date
  const [alreadyFollowed, setAlreadyFollowed] = useState<boolean>(auction.followers.some((followerId) => followerId === loggedInUser.id))
  const [metTheDeadline, setMetTheDeadline] = useState<boolean>(Math.round(diff) <= 0)

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
    <div className={`flex bg-blue-200 text-nowrap overflow-hidden duration-700 ease-in-out relative z-40 flex-shrink-0 border border-blue-300 h-full flex-col items-start justify-start shadow-slate-800 shadow-xl rounded-lg ${!isListing ? '-mr-20 w-full' : 'mr-0 w-1/4'}`}>

      {metTheDeadline &&
        <div className="top-0 flex flex-row justify-center items-center absolute bottom-0 z-20 group left-0 right-0 bg-white/70 hover:bg-white/0 duration-100">
          <p className={`-rotate-90 text-9xl font-logo text-blue-600 opacity-100 duration-100 group-hover:opacity-0`}>SOLD!</p>
        </div>
      }

      <div className={`flex w-full items-start mb-4 min-h-44 overflow-hidden relative ${!isListing ? 'mb-0' : 'mb-4'}`}>
        <Carousel className="w-full">
          <CarouselContent className="h-64">
            {auction.item.imageList.map((img: string) =>
              <CarouselItem className="relative" key={img}>
                <div className="absolute blur-sm top-0 right-0 bottom-0 left-0" style={{ background: `url(http://localhost:8080/${img.replaceAll(/\\/g, "/")})`, backgroundPosition: "center", backgroundSize: "contain" }} />
                <Image
                  fill
                  alt="uploadedImage"
                  src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
                  style={{ objectFit: `${isListing ? "contain" : "cover"}` }} />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>

      <div className={`flex flex-col w-full p-1 gap-3 justify-start items-start duration-500 ${!isListing ? 'h-0 p-0' : 'h-96'}`}>
        <CardInformation fetchedItemInfo={auction.item.title} title="Title" auction={true} />
        <CardInformation fetchedItemInfo={auction.minValue + ' $'} title="Minimum Auction Value" auction={true} />
        <CardInformation fetchedItemInfo={auction.buyout + ' $'} title="Buyout Value" auction={true} />
        <CardInformation tagList={auction.item.tagList} title="Tags" auction={true} />
        <CardInformation fetchedItemInfo={dayjs(dateDataConverted).format("DD/MM/YYYY")} title="Deadline" auction={true} />

        <div className="flex flex-col w-full items-start justify-start gap-3">
          <div className="flex flex-row w-full justify-between items-center text-gray-800 tracking-wide mb- text-base">
            <p>See the Auction:</p>
            <Link href={`/auctions/${auction._id}`} className="bg-blue-800 text-white rounded-lg p-1 hover:bg-blue-500 duration-150"><HiOutlineScale /></Link>
          </div>

          {loggedInUser.id !== auction.item.owner &&
            <div className="flex flex-row w-full justify-between items-center text-gray-800 tracking-wide text-base">
              <p>{alreadyFollowed ? "Unfollow the Auction:" : "Follow the Auction:"}</p>
              <button onClick={() => followAuction(auction._id)} className="bg-blue-800 text-white rounded-lg p-1 hover:bg-blue-500 duration-150"><HiOutlineLightBulb /></button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}