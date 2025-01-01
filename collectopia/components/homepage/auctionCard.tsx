import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import AuctionImages from "./auctionImages"
import AuctionInformation from "./auctionInformation"

type FetchedAuction = {
  auctionTag: string;
  bidList: any;
  buyout: number;
  createdAt: string;
  followers: any;
  item: any;
  minValue: number;
  seller: string;
  _id: string
}

type ComponentProps = {
  auction: FetchedAuction
}

export default function AuctionCard({ auction }: ComponentProps) {

  console.log(auction)
  return (
    <div className="bg-lime-100 p-3 flex flex-col border border-green-800 w-2/6">
      <div className="flex flex-row w-full">
        <AuctionImages imageList={auction.item.imageList} />
      </div>

      <div className={`flex flex-col w-full p-1 gap-3 justify-start items-start duration-500`}>
        <AuctionInformation title={"Title"} fetchedItemInfo={auction.item.title} />
        <AuctionInformation title={"Min. Bid Value"} fetchedItemInfo={auction.minValue + ' $'} />
        <AuctionInformation title={"Buyout"} fetchedItemInfo={auction.buyout + ' $'} />
        <AuctionInformation title={"Tags"} tagList={auction.item.tagList} />


      </div>
    </div>
  )
}