import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"

type ComponentProps = {
  offeredItem: {
    imageList: string[]
    title: string;
    _id: string
  }
}

export default function OfferDetailItemCard({ offeredItem }: ComponentProps) {

  return (
    <div className="flex flex-col w-1/3 bg-gray-50 border border-orange-300 shadow-lg shadow-orange-100/50 p-1 items-start justify-start rounded-sm flex-shrink-0">
      <Carousel className="w-full">
        <CarouselContent className="h-96">
          {offeredItem.imageList.map((img: string) =>
            <CarouselItem className="relative" key={img}>
              <div className="absolute blur-sm top-0 right-0 bottom-0 left-0" style={{ background: `url(http://localhost:8080/${img.replaceAll(/\\/g, "/")})`, backgroundPosition: "center", backgroundSize: "cover" }} />
              <Image
                fill
                alt="uploadedImage"
                src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
                style={{ objectFit: "contain" }} />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      <div className="flex w-full items-center justify-center text-center">
        <p className="text-lg tracking-wide text-gray-700 font-logo">{offeredItem.title}</p>
      </div>
    </div>
  )
}