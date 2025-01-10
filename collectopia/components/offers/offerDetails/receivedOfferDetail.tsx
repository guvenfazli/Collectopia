import OfferDetailItemCard from "./offerDetailItemCard"

type ComponentProps = {
  chosenOffer: {
    offer: any,
    offerer: string | { _id: string, name: string, surname: string }
  }
}

export default function ReceivedOfferDetail({ chosenOffer }: ComponentProps) {

  console.log(chosenOffer)

  return (
    <div className="flex flex-col w-full justify-start items-start gap-3 bg-orange-200 p-1">
      <div className="flex flex-row w-full justify-start items-start gap-2 p-1 overflow-scroll overflow-y-hidden border-b border-b-orange-800" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {chosenOffer.offer.offeredItems.map((offeredItem: any) => <OfferDetailItemCard key={offeredItem._id} offeredItem={offeredItem} />)}
      </div>

      <div className="flex flex-row w-full justify-start items-start gap-2 p-1 overflow-scroll overflow-y-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {chosenOffer.offer.wantedItems.map((wantedItem: any) => <OfferDetailItemCard key={wantedItem._id} offeredItem={wantedItem} />)}
      </div>

    </div>

  )
}