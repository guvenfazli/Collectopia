export default function OfferDetailItemCard({ offeredItem }: any) {

  return (
    <div className="flex w-1/4 items-start justify-start">
      <p>{offeredItem.title}</p>
    </div>
  )
}