import ReceivedOfferCard from "./receivedOfferCard"

type ComponentProps = {
  offersList: any,
  renderOffers: string
}

export default function OffersList({ offersList, renderOffers }: ComponentProps) {
  



  return (
    <div className="flex flex-col w-1/2 gap-2 border-r border-orange-800">
      <ReceivedOfferCard />
    </div>
  )
}