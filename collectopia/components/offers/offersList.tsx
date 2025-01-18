import ReceivedOfferCard from "./receivedOffers/receivedOfferCard"
import SentOfferCard from "./sentOffers/sentOfferCard"
type Offer = {

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

}

type ComponentProps = {
  offersList: {
    [renderOffers: string]: Offer[];
  };
  renderOffers: string;
  setRenderOffers: React.Dispatch<React.SetStateAction<string>>;
  setChosenOffer: React.Dispatch<React.SetStateAction<any>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function OffersList({ offersList, renderOffers, setRenderOffers, setChosenOffer, setCurrentPage }: ComponentProps) {

  function changeTheListing(offerType: string) {
    setChosenOffer(undefined)
    setRenderOffers(offerType)
    setCurrentPage(0)
  }

  return (
    <div className="flex flex-col w-1/2 gap-2 border-r border-orange-800 pr-3">
      <div className="flex gap-1 self-center -mt-2 text-lg bg-orange-800 py-1 px-3 text-white rounded-bl-lg rounded-br-lg shadow-[0px_4px_8px_rgba(0,0,0,0.1),0px_2px_4px_rgba(255,165,0,0.15)]">
        <p onClick={() => changeTheListing("receivedOffers")} className={`font-logo tracking-widest duration-150 hover:cursor-pointer hover:font-extrabold ${renderOffers === "receivedOffers" && 'font-extrabold'}`}>Received Offers</p>
        <p>||</p>
        <p onClick={() => changeTheListing("sentOffers")} className={`font-logo tracking-widest duration-150 hover:cursor-pointer hover:font-extrabold ${renderOffers === "sentOffers" && 'font-extrabold'}`}>Sent Offers</p>
      </div>

      {
        offersList[renderOffers].map((offer: any) => {
          if (renderOffers === "receivedOffers") {
            return (
              <ReceivedOfferCard key={offer._id} offer={offer} setChosenOffer={setChosenOffer} />
            )
          } else {
            return (
              <SentOfferCard key={offer._id} offer={offer} setChosenOffer={setChosenOffer} />
            )
          }

        })
      }
    </div>
  )
}