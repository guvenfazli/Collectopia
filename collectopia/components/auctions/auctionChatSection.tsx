import { useState } from "react"
import AuctionChatInputField from "./auctionChatInputField"

type Message = {
  message: string,
  sender: any,
  _id: string
}

type MessageList = Message[]


type ComponentProps = {
  auctionId: string
  messages: MessageList
}


export default function AuctionChatSection({ auctionId, messages }: ComponentProps) {

  const [messageList, setMessageList] = useState<MessageList>(messages ? messages : [])

  console.log(messages)
  return (
    <div className="flex flex-col justify-between h-full w-1/2 text-wrap">
      {messageList.length <= 0 ? <p className="self-center">No message yet! Be the first one!</p> : messageList.map((message: Message) => {
        return (
          <div className="flex w-full items-center justify-start gap-1" key={message._id}>
            <p>{message.sender}:</p>
            <p>{message.message}</p>
          </div>
        )
      })}

      <AuctionChatInputField auctionId={auctionId} />
    </div>
  )
}