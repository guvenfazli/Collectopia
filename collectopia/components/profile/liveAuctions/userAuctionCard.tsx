import CardInformation from "../cardInformation"
import dayjs from "dayjs"

type FetchedAuction = {
  _id: string,
  minValue: number,
  buyout: number,
  deadline: number,
  createdAt: string,
  followers: string[],
  item: any
}

type ComponentsProps = {
  auction: FetchedAuction;
  isListing: boolean
}





export default function UserAuctionCard({ auction, isListing }: ComponentsProps) {

  const dateDataConverted = dayjs(auction.deadline) // Formats the date




  return (
    <div className={`flex bg-blue-200 text-nowrap overflow-hidden duration-700 ease-in-out flex-shrink-0 border border-blue-300 h-full flex-col items-start justify-start shadow-slate-800 shadow-xl rounded-lg ${!isListing ? '-mr-20 w-full' : 'mr-0 w-1/4'}`}>





      <div className={`flex flex-col w-full p-1 gap-3 justify-start items-start ${!isListing ? 'h-0' : 'h-auto'}`}>
        <CardInformation fetchedItemInfo={auction.item.title} title="Title" />
        <CardInformation fetchedItemInfo={auction.minValue + ' $'} title="Minimum Auction Value" />
        <CardInformation fetchedItemInfo={auction.buyout + ' $'} title="Buyout Value" />
        <CardInformation tagList={auction.item.tagList} title="Tags" />
        <CardInformation fetchedItemInfo={dateDataConverted.format("DD/MM/YYYY")} title="Deadline" />
      </div>
    </div>
  )
}