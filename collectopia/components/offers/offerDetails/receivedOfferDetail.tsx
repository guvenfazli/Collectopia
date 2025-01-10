import OfferDetailItemCard from "./offerDetailItemCard"
import dayjs from "dayjs"

type ComponentProps = {
  chosenOffer: {
    offer: any;
    offerer: string | { _id: string, name: string, surname: string };
    createdAt: string;
  }
}

export default function ReceivedOfferDetail({ chosenOffer }: ComponentProps) {

  return (
    <div className="flex flex-col w-full justify-start items-start gap-3 bg-orange-200 p-1 rounded-md shadow-[0px_4px_8px_rgba(0,0,0,0.1),0px_2px_4px_rgba(255,165,0,0.15)]">

      <div className="flex w-full justify-between px-2">
        <p className="text-xl font-logo tracking-wider text-orange-800">John Doe</p>
        <p>Offer Sent At: {dayjs(chosenOffer.createdAt).startOf("day").format("DD/MM/YY")}</p>
      </div>

      <div className="flex flex-row w-full justify-start items-start gap-2 p-1 overflow-scroll overflow-y-hidden border-b border-b-orange-800" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {chosenOffer.offer.offeredItems.map((offeredItem: any) => <OfferDetailItemCard key={offeredItem._id} offeredItem={offeredItem} />)}
      </div>

      <div className="flex flex-row w-full justify-start items-start gap-2 p-1 overflow-scroll overflow-y-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {chosenOffer.offer.wantedItems.map((wantedItem: any) => <OfferDetailItemCard key={wantedItem._id} offeredItem={wantedItem} />)}
      </div>

      <div className="px-2">
        <p className="text-xl font-logo tracking-wider text-orange-800">You</p>
      </div>

    </div>

  )
}