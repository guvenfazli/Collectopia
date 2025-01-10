import ReceivedOfferCard from "./receivedOffers/receivedOfferCard"

type ComponentProps = {
  offersList: any,
  renderOffers: string;
  setRenderOffers: React.Dispatch<React.SetStateAction<string>>
}

export default function OffersList({ offersList, renderOffers, setRenderOffers }: ComponentProps) {

  function changeTheListing(offerType: string) {
    setRenderOffers(offerType)
  }






  return (
    <div className="flex flex-col w-1/2 gap-2 border-r border-orange-800 pr-3">
      <div className="flex gap-1 self-center -mt-2 text-lg bg-orange-800 py-1 px-3 text-white rounded-bl-lg rounded-br-lg">
        <p onClick={() => changeTheListing("receivedOffers")} className="font-logo tracking-widest duration-150 hover:cursor-pointer hover:font-extrabold">Received Offers</p>
        <p>||</p>
        <p onClick={() => changeTheListing("sentOffers")} className="font-logo tracking-widest duration-150 hover:cursor-pointer hover:font-extrabold">Sent Offers</p>
      </div>

      {
        offersList[renderOffers].map((offer: any) =>
          <ReceivedOfferCard key={offer._id} offer={offer.offer} />
        )
      }
    </div>
  )
}