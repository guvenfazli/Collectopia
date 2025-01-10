import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function OfferDetailItemCard({ offeredItem }: any) {

  return (
    <div className="flex flex-col w-1/3 border border-orange-800 p-1 items-start justify-start">
      <Carousel className="w-full mb-2">
        <CarouselContent className="h-96">
          {offeredItem.imageList.map((img: string) =>
            <CarouselItem className="relative" key={img}>
              <div className="absolute blur-sm top-0 right-0 bottom-0 left-0" style={{ background: `url(http://localhost:8080/${img.replaceAll(/\\/g, "/")})`, backgroundPosition: "center", backgroundSize: "contain" }} />
              <Image
                fill
                alt="uploadedImage"
                src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
                style={{ objectFit: "contain" }} />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      <p className="text-lg tracking-wide ">{offeredItem.title}</p>
    </div>
  )
}