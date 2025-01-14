import SentOfferDetail from "./sentOfferDetail"
import ReceivedOfferDetail from "./receivedOfferDetail"

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
  },
  renderOffers: string
}



export default function OfferDetails({ chosenOffer, renderOffers }: ComponentProps) {

  return (
    <div className={`flex flex-col relative pl-4 items-center justify-center w-1/2 `}>

      <div className="flex gap-1 self-center top-0 absolute -mt-2 text-lg bg-orange-800 py-1 px-3 text-white rounded-bl-lg rounded-br-lg shadow-[0px_4px_8px_rgba(0,0,0,0.1),0px_2px_4px_rgba(255,165,0,0.15)]">
        <p className="font-logo tracking-widest">Offer Details</p>
      </div>

      <div
        className={`flex duration-150 gap-1 self-center -mt-2 text-lg bg-orange-800 py-1 px-3 text-white rounded-lg relative 
        ${chosenOffer && 'hidden'} shadow-[0px_4px_8px_rgba(0,0,0,0.1),0px_2px_4px_rgba(255,165,0,0.15)]`}>
        <p className="font-logo tracking-widest duration-150">You did not chose any offer!</p>
      </div>

      {(renderOffers === "receivedOffers" && chosenOffer) && <ReceivedOfferDetail chosenOffer={chosenOffer} />}
      {(renderOffers === "sentOffers" && chosenOffer) && <SentOfferDetail chosenOffer={chosenOffer} />}
    </div>
  )
}