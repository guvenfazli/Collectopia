import WantedItemsImages from "./wantedItemsImages"
type ComponentProps = {
  wantedItem: {
    title: string,
    imageList: string[]
  }
}

export default function WantedItemsCard({ wantedItem }: ComponentProps) {
  return (
    <div className="w-1/4 border border-orange-800 rounded-xl overflow-hidden">
      <WantedItemsImages imageList={wantedItem.imageList} />
    </div>
  )
}