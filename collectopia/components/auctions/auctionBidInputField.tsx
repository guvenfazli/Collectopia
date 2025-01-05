export default function AuctionBidInputField() {
  return (
    <div className="flex w-full items-center justify-between">
      <input placeholder="Place your Bid" className="p-3 bg-orange-100 border border-orange-800 w-1/2 text-orange-800 font-semibold outline-none" />
      <input placeholder="Buyout" className="p-3 bg-orange-100 border border-orange-800 w-1/2 text-orange-800 font-semibold outline-none" />
    </div>
  )
}