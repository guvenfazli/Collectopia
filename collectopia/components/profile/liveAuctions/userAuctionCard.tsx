import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import CardInformation from "../cardInformation"
import dayjs from "dayjs"
import Image from "next/image"

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

  const dateDataConverted = dayjs.unix(auction.deadline) // Formats the date

  return (
    <div className={`flex bg-blue-200 text-nowrap overflow-hidden duration-700 ease-in-out flex-shrink-0 border border-blue-300 h-full flex-col items-start justify-start shadow-slate-800 shadow-xl rounded-lg ${!isListing ? '-mr-20 w-full' : 'mr-0 w-1/4'}`}>

      <div className={`flex w-full items-start mb-4 min-h-44 overflow-hidden relative ${!isListing ? 'mb-0' : 'mb-4'}`}>
        <Carousel className="w-full">
          <CarouselContent className="h-64">
            {auction.item.imageList.map((img: string) =>
              <CarouselItem className="relative" key={img}>
                <div className="absolute blur-sm top-0 right-0 bottom-0 left-0" style={{ background: `url(http://localhost:8080/${img.replaceAll(/\\/g, "/")})`, backgroundPosition: "center", backgroundSize: "contain" }} />
                <Image
                  fill
                  alt="uploadedImage"
                  src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
                  style={{ objectFit: `${isListing ? "contain" : "cover"}` }} />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>





      <div className={`flex flex-col w-full p-1 gap-3 justify-start items-start duration-500 ${!isListing ? 'h-0 p-0' : 'h-80'}`}>
        <CardInformation fetchedItemInfo={auction.item.title} title="Title" />
        <CardInformation fetchedItemInfo={auction.minValue + ' $'} title="Minimum Auction Value" />
        <CardInformation fetchedItemInfo={auction.buyout + ' $'} title="Buyout Value" />
        <CardInformation tagList={auction.item.tagList} title="Tags" />
        <CardInformation fetchedItemInfo={dayjs(dateDataConverted).format("DD/MM/YYYY")} title="Deadline" />
      </div>
    </div>
  )
}