import AuctionBidInputField from "./auctionBidInputField"

type ComponentProps = {
  bidList: any // Will Change
}



export default function AuctionBidSection({ bidList }: ComponentProps) {
  return (
    <div className="flex flex-col justify-between h-full w-1/2 text-wrap">
      {bidList.length <= 0 ? <p>No bid placed yet! Be the first one!</p> : bidList.map((bid: any) => <p key={bid}>{bid}</p>)}
      <AuctionBidInputField />
    </div>
  )
}