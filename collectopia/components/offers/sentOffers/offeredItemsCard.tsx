import WantedItemsImages from "../receivedOffers/wantedItemsImages"

type ComponentProps = {
  offeredItem: {
    title: string,
    imageList: string[]
  }
}

export default function OfferedItemsCard({ offeredItem }: ComponentProps) {
  
  return (
    <div className="w-1/4 border border-orange-800 rounded-xl overflow-hidden">
      <WantedItemsImages imageList={offeredItem.imageList} />
    </div>
  )
}