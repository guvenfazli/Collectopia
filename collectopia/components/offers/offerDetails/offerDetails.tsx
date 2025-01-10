import SentOfferDetail from "./sentOfferDetail"
import ReceivedOfferDetail from "./receivedOfferDetail"

type ComponentProps = {
  chosenOffer: any,
  renderOffers: string
}



export default function OfferDetails({ chosenOffer, renderOffers }: ComponentProps) {

  console.log(chosenOffer)

  return (
    <div className={`flex flex-col w-1/2 pr-3 ${chosenOffer && 'overflow-hidden'}`}>
      
      <div className={`flex duration-150 gap-1 -translate-y-0 self-center -mt-2 text-lg bg-orange-800 py-1 px-3 text-white rounded-bl-lg rounded-br-lg relative ${chosenOffer && '-translate-y-12'}`}>
        <p className="font-logo tracking-widest duration-150">You did not chose any offer!</p>
      </div>

      {(renderOffers === "receivedOffers" && chosenOffer) && <ReceivedOfferDetail chosenOffer={chosenOffer} />}
      {(renderOffers === "sentOffers" && chosenOffer) && <SentOfferDetail chosenOffer={chosenOffer} />}
    </div>
  )
}