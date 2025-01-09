import WantedItemsCard from "./wantedItemsCard"
type ComponentProps = {
  offer: any
}
export default function ReceivedOfferCard({ offer }: ComponentProps) {

  console.log(offer)

  return (
    <div className="flex flex-col gap-2 p-1 w-full">
      <div>
        {offer.offeredItems.map((offeredItem: any) => <p key={offeredItem._id}>{offeredItem.title}</p>)}
      </div>


      <div className="flex justify-start items-start gap-2 overflow-scroll overflow-y-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }} >
        {offer.wantedItems.map((wantedItem: any) => <WantedItemsCard key={wantedItem._id} wantedItem={wantedItem} />)}
      </div>
    </div>
  )
}