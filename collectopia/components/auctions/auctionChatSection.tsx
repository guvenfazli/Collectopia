import { useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import { IoIosMegaphone } from "react-icons/io"
import AuctionChatInputField from "./auctionChatInputField"
import Link from "next/link";

type FetchedMessages = {
  auctionRoom: string;
  createdAt: string;
  messages: {
    message: string;
    sender: { _id: string, name: string };
    _id: string
  }[];
  updatedAt: string;
  _id: string
}

type MessageList = FetchedMessages[]

type ComponentProps = {
  auctionId: string
  messages: MessageList;
  ownerId: string;
  socket: Socket | undefined
}


export default function AuctionChatSection({ auctionId, messages, ownerId, socket }: ComponentProps) {

  const [messageList, setMessageList] = useState<MessageList>(messages ? messages : [])

  useEffect(() => {
    setMessageList(messages)
  }, [messages])


  return (
    <div className="flex flex-col justify-between h-full w-1/2">
      <div className="flex flex-col-reverse items-start justify-start h-full w-full overflow-scroll overflow-x-hidden scroll-smooth">
        {messageList.length <= 0 ? <p className="self-center">No message yet! Be the first one!</p> : messageList.map((message: any) => {
          return (
            <div className="flex w-full items-center gap-1 text-wrap" key={message._id}>
              <Link href={`/profile/${message.sender._id}`} className="font-medium text-orange-600 flex items-center ">{message.sender.name} {message.sender._id === ownerId && <IoIosMegaphone />}:</Link>
              <p className="break-words overflow-hidden">{message.message}</p>
            </div>
          )
        })}
      </div>

      <AuctionChatInputField auctionId={auctionId} socket={socket} />
    </div>
  )
}