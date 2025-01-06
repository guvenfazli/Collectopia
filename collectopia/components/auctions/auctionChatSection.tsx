import { useState } from "react"
import { IoIosMegaphone } from "react-icons/io"
import AuctionChatInputField from "./auctionChatInputField"

type Message = {
  message: string,
  sender: any,
  _id: string
}

type MessageList = Message[]


type ComponentProps = {
  auctionId: string
  messages: MessageList;
  ownerId: string
}


export default function AuctionChatSection({ auctionId, messages, ownerId }: ComponentProps) {

  const [messageList, setMessageList] = useState<MessageList>(messages ? messages : [])


  return (
    <div className="flex flex-col justify-between h-full w-1/2">
      <div className="flex flex-col items-start justify-start h-full w-full overflow-scroll overflow-x-hidden">
        {messageList.length <= 0 ? <p className="self-center">No message yet! Be the first one!</p> : messageList.map((message: Message) => {
          return (
            <div className="flex w-full items-center gap-1 text-wrap" key={message._id}>
              <p className="font-bold text-orange-600 flex items-center ">{message.sender.name} {message.sender._id === ownerId && <IoIosMegaphone />}:</p>
              <p className="break-words overflow-hidden">{message.message}</p>
            </div>
          )
        })}
      </div>

      <AuctionChatInputField auctionId={auctionId} />
    </div>
  )
}