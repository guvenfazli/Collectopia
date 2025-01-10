import SentOfferDetail from "./sentOfferDetail"
import ReceivedOfferDetail from "./receivedOfferDetail"

type ComponentProps = {
  chosenOffer: any,
  renderOffers: string
}



export default function OfferDetails({ chosenOffer, renderOffers }: ComponentProps) {

  return (
    <div className={`flex flex-col pl-4 items-center justify-center w-1/2`}>

      <div className={`flex duration-150 gap-1 opacity-100 self-center -mt-2 text-lg bg-orange-800 py-1 px-3 text-white rounded-lg relative ${chosenOffer && 'opacity-0'}`}>
        <p className="font-logo tracking-widest duration-150">You did not chose any offer!</p>
      </div>

      {(renderOffers === "receivedOffers" && chosenOffer) && <ReceivedOfferDetail chosenOffer={chosenOffer} />}
      {(renderOffers === "sentOffers" && chosenOffer) && <SentOfferDetail chosenOffer={chosenOffer} />}
    </div>
  )
}