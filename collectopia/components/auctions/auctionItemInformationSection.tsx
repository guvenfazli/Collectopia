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
    <div className="flex flex-col w-1/2 h-full justify-between items-start">
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.title} title={"Title"} />
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.category} title={"Category"} />
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.subCategory} title={"Subcategory"} />
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.minValue + ' $'} title={"Minimum Bid Value"} />
      <AuctionItemInformation fetchedItemInfo={fetchedAuction.item.buyout + ' $'} title={"Buyout"} />
      <AuctionItemInformation tagList={fetchedAuction.item.tagList} title={"Tags"} />
      <AuctionItemInformation fetchedItemInfo={dayjs(dateDataConverted).format("DD/MM/YYYY")} title={"Deadline"} />
    </div>
  )
}