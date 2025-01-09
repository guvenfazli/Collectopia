type ComponentProps = {
  offer: any
}
export default function ReceivedOfferCard({ offer }: ComponentProps) {

  console.log(offer)

  return (
    <div className="flex flex-col gap-2 w-full">
      <div>
        {offer.offeredItems.map((offeredItem: any) => <p key={offeredItem._id}>{offeredItem.title}</p>)}
      </div>


      <div>
        {offer.wantedItems.map((wantedItem: any) => <p key={wantedItem._id}>{wantedItem.title}</p>)}

      </div>
    </div>
  )
}