import AuctionItemInformation from "./auctionItemInformation"
import dayjs from "dayjs"
type FetchedAuction = {
  auctionTag: string;
  bidList: any;
  deadline: number;
  buyout: number;
  createdAt: string;
  followers: any;
  item: any;
  minValue: number;
  seller: string;
  _id: string
}


type ComponentProps = {
  fetchedAuction: FetchedAuction
}



export default function AuctionItemInformationSection({ fetchedAuction }: ComponentProps) {

  const dateDataConverted = dayjs.unix(fetchedAuction.deadline)

  return (
    <div className="flex flex-col w-1/2 h-full items-start">
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.title} title={"Title"} />
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.category} title={"Category"} />
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.owner.name} title={"Owner"} />
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.minValue + ' $'} title={"Minimum Bid Value"} />
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.buyout + ' $'} title={"Buyout"} />
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.bidList.length > 0 ? fetchedAuction.bidList[0].bidValue : "There is no last bid."} title={"Last Bid"} />
      <AuctionItemInformation fetchedItemInfo={dayjs(dateDataConverted).format("DD/MM/YYYY")} title={"Deadline"} />
    </div>
  )
}