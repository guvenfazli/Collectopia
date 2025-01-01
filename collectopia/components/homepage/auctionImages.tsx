import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

type ImageList = string[]

type ComponentProps = {
  imageList: ImageList
}

import Image from "next/image"

export default function AuctionImages({ imageList }: ComponentProps) {
  return (
    <div className="w-full relative">
      <Carousel className="w-full">
        <CarouselContent className="h-64">
          {imageList.map((img: string) =>
            <CarouselItem className="relative" key={img}>
              <div className="absolute blur-sm top-0 right-0 bottom-0 left-0" style={{ background: `url(http://localhost:8080/${img.replaceAll(/\\/g, "/")})`, backgroundPosition: "center", backgroundSize: "contain" }} />
              <Image
                fill
                alt="uploadedImage"
                src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
                style={{ objectFit: `cover` }} />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  )
}