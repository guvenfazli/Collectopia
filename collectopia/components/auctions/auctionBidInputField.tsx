export default function AuctionBidInputField() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <input placeholder="Place your Bid" className="p-3 bg-orange-100 border border-orange-800 w-1/2 text-orange-800 font-semibold outline-none" />
      <input placeholder="Buyout" className="p-3 bg-orange-100 border border-orange-800 w-1/2 text-orange-800 font-semibold outline-none" />
      <button className="px-1 bg-orange-800 font-logo h-full text-white duration-100 rounded-sm hover:bg-orange-300 hover:text-orange-800">Proceed</button>
    </div>
  )
}