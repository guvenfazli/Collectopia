import AuctionChatInputField from "./auctionChatInputField"
export default function AuctionChatSection() {
  
  
  
  return (
    <div className="flex flex-col justify-between h-full w-1/2 text-wrap">
      <p className="self-center">No message yet! Be the first one!</p>
      <AuctionChatInputField />
    </div>
  )
}