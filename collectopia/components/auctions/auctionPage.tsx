"use client"
import { useState, useEffect } from "react"
import { io, Socket } from "socket.io-client"
import { useParams } from "next/navigation"
import AuctionItemImage from "./auctionItemImage"
import AuctionItemInformationSection from "./auctionItemInformationSection"
import AuctionBidSection from "./auctionBidSection"
import AuctionChatSection from "./auctionChatSection"
import dayjs from "dayjs"

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
  _id: string;
  isSold: boolean;

}

type FetchedMessages = {
  auctionRoom: string;
  createdAt: string;
  messages: {
    message: string;
    sender: { _id: string, name: string };
    _id: string
  }[];
  updatedAt: string;
  _id: string;
}

type BidList = {
  bidValue: number;
  bidder: {
    _id: string;
    name: string;
    surname: string;
  }
  createdAt: string;
  _id: string
}


export default function AuctionMainPage() {

  const { auctionId } = useParams<{ auctionId: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket>()
  const [fetchedAuction, setFetchedAuction] = useState<FetchedAuction | undefined>()
  const [messageList, setMessageList] = useState<FetchedMessages[]>([])
  const [fetchedBidList, setFetchedBidList] = useState<BidList[]>([])
  const [auctionClose, setAuctionClose] = useState<boolean>(false)
  const todaysDate = dayjs(new Date()).startOf("day")
  const todaysDateTimestamp = dayjs(todaysDate).unix()

  useEffect(() => {

    const socketConnection = io("http://localhost:8080/auctionRoom")
    setSocket(socketConnection)
    socketConnection.emit("joinToAuctionRoom", auctionId)

    async function fetchAuction() {
      setIsLoading(true)
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
        if (resData.fetchedAuction.deadline < todaysDateTimestamp || resData.fetchedAuction.isSold === true) {
          setAuctionClose(true)
        }
        setFetchedAuction(resData.fetchedAuction)
        setFetchedBidList(resData.fetchedBidlist.bidList ? resData.fetchedBidlist.bidList : [])
        setMessageList(resData.fetchedMessages.messages)
        setIsLoading(false)
      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchAuction()


    return () => {
      socketConnection.emit('leaveRoom', { auctionId: auctionId })
    }
  }, [])


  return (
    <div className="flex p-3 flex-col relative justify-start items-start w-10/12 bg-white">
      {auctionClose &&
        <div className="top-0 flex flex-row justify-center items-center absolute bottom-0 z-20 group left-0 right-0 bg-white/70 hover:bg-white/50 duration-100">
          <p className={`text-9xl font-logo text-orange-800 opacity-100 duration-100 group-hover:opacity-50`}>SOLD!</p>
        </div>
      }

      {isLoading && <span id="headerLoader" className="self-center" />}

      {fetchedAuction &&
        <>
          <div className="flex w-full justify-start h-96 items-start gap-3 mb-2 bg-orange-200">
            <AuctionItemImage imageList={fetchedAuction!.item.imageList} />
            <AuctionItemInformationSection fetchedAuction={fetchedAuction} />
          </div>

          <div className="flex w-full justify-start h-96 items-start gap-3">
            <AuctionBidSection fetchedAuction={fetchedAuction} bidList={fetchedBidList} auctionId={auctionId} ownerId={fetchedAuction.item.owner._id} />
            <AuctionChatSection auctionId={auctionId} messages={messageList} ownerId={fetchedAuction.item.owner._id} />
          </div>
        </>
      }

    </div>
  )
}