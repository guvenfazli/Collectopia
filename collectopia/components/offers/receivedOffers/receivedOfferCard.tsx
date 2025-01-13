import WantedItemsCard from "./wantedItemsCard"
import OfferResult from "../offerDetails/offerResult"

type ComponentProps = {
  offer: {
    createdAt: string;
    offer: {
      offeredItems: [{ _id: string; title: string; imageList: string[]; }]
      wantedItems: [{ _id: string; title: string; imageList: string[]; }]
    };
    offerAccepted: boolean;
    offerActive: boolean;
    offerer: { _id: string; name: string; surname: string; }
    receiver: string;
    updatedAt: string;
    _id: string;
  };
  setChosenOffer: React.Dispatch<React.SetStateAction<any>>;
}

export default function ReceivedOfferCard({ offer, setChosenOffer }: ComponentProps) {

  return (
    <div onClick={() => setChosenOffer({ offer })} className="flex flex-col gap-2 w-full duration-150 cursor-pointer bg-orange-200 hover:bg-orange-300 p-3 rounded-md shadow-[0px_4px_8px_rgba(0,0,0,0.1),0px_2px_4px_rgba(255,165,0,0.15)] relative">

      {!offer.offerActive && <OfferResult offerResult={offer.offerAccepted} />}


      <div className="py-1 border-b border-b-orange-800">
        <p className="font-logo text-lg tracking-widest text-orange-800">Click to see details</p>
      </div>


      <div className="flex justify-start items-start gap-2 overflow-scroll overflow-y-hidden border-b border-orange-800 pb-1" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {offer.offer.offeredItems.map((offeredItem: any) => <WantedItemsCard key={offeredItem._id} wantedItem={offeredItem} />)}
      </div>


      <div className="flex justify-start items-start gap-2 overflow-scroll overflow-y-hidden pb-3" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }} >
        {offer.offer.wantedItems.map((wantedItem: any) => <WantedItemsCard key={wantedItem._id} wantedItem={wantedItem} />)}
      </div>

    </div>
  )
}