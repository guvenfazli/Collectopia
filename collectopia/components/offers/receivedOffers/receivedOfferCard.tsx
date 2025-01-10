import WantedItemsCard from "./wantedItemsCard"
type ComponentProps = {
  offer: any
}
export default function ReceivedOfferCard({ offer }: ComponentProps) {

  return (
    <div className="flex flex-col gap-2 w-full duration-150 cursor-pointer bg-orange-200 hover:bg-orange-300 p-3 rounded-md">

      <div className="py-1 border-b border-b-orange-800">
        <p className="font-logo text-lg tracking-widest text-orange-800">Click to see details</p>
      </div>


      <div className="flex justify-start items-start gap-2 overflow-scroll overflow-y-hidden border-b border-orange-800 pb-1" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {offer.offeredItems.map((offeredItem: any) => <WantedItemsCard key={offeredItem._id} wantedItem={offeredItem} />)}
      </div>


      <div className="flex justify-start items-start gap-2 overflow-scroll overflow-y-hidden pb-3" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }} >
        {offer.wantedItems.map((wantedItem: any) => <WantedItemsCard key={wantedItem._id} wantedItem={wantedItem} />)}
      </div>
    </div>
  )
}