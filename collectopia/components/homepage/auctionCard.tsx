import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

type FetchedAuction = {
  auctionTag: string;
  bidList: any;
  buyout: number;
  createdAt: string;
  followers: any;
  item: string;
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
    <div className="bg-lime-100 flex flex-col border border-green-800 w-2/6">
      <p>Will be an auction card.</p>
    </div>
  )
}