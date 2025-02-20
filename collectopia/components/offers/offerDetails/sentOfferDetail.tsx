import OfferDetailItemCard from "./offerDetailItemCard"
import dayjs from "dayjs"
type ComponentProps = {
  chosenOffer: {
    offer: {
      createdAt: string;
      offer: {
        offeredItems: [{ _id: string; title: string; imageList: string[]; }]
        wantedItems: [{ _id: string; title: string; imageList: string[]; }]
      };
      offerAccepted: boolean;
      offerActive: boolean;
      offerer: { _id: string; name: string; surname: string; }
      receiver: { _id: string; name: string; surname: string; }
      updatedAt: string;
      _id: string;
    };
    receiver: { _id: string, name: string, surname: string }
    createdAt: string;
  }
}


export default function SentOfferDetail({ chosenOffer }: ComponentProps) {

  return (
    <div className="flex flex-col w-full justify-start items-start gap-3 bg-orange-200 p-1 rounded-md shadow-[0px_4px_8px_rgba(0,0,0,0.1),0px_2px_4px_rgba(255,165,0,0.15)] relative">

      <div className="flex w-full justify-between px-2 border-b border-b-orange-800">
        <p className="text-xl font-logo tracking-wider text-orange-800">{chosenOffer.offer.receiver.name + ' ' + chosenOffer.offer.receiver.surname}</p>
        <p>Offer Sent At: {dayjs(chosenOffer.offer.createdAt).startOf("day").format("DD/MM/YY")}</p>
      </div>

      <div className="flex flex-row w-full justify-start items-start gap-2 p-1 overflow-scroll overflow-y-hidden border-b border-b-orange-800" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {chosenOffer.offer.offer.wantedItems.map((wantedItem: any) => <OfferDetailItemCard key={wantedItem._id} offeredItem={wantedItem} />)}
      </div>

      <div className="flex flex-row w-full justify-start items-start gap-2 p-1 overflow-scroll overflow-y-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {chosenOffer.offer.offer.offeredItems.map((offeredItem: any) => <OfferDetailItemCard key={offeredItem._id} offeredItem={offeredItem} />)}
      </div>

      <div className="flex w-full pt-1 px-2 border-t border-t-orange-800">
        <p className="text-xl font-logo tracking-wider text-orange-800">You</p>
      </div>

    </div>
  )
}