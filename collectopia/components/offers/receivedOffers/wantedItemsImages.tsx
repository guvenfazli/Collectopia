import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Image from "next/image"

type ComponentProps = {
  imageList: string[]
}
export default function WantedItemsImages({ imageList }: ComponentProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="h-64">
        {imageList.map((img: string) =>
          <CarouselItem className="relative " key={img}>
            <div className="absolute blur-sm top-0 right-0 bottom-0 left-0 rounded-xl" style={{ background: `url(http://localhost:8080/${img.replaceAll(/\\/g, "/")})`, backgroundPosition: "center", backgroundSize: "contain" }} />
            <Image
              fill
              alt="uploadedImage"
              src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
              style={{ objectFit: "contain" }} className="rounded-xl" />
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  )
}