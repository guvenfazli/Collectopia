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
      <CarouselContent className="h-32">
        {imageList.map((img: string) =>
          <CarouselItem className="relative " key={img}>
            <Image
              fill
              alt="uploadedImage"
              src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
              style={{ objectFit: "cover" }} className="rounded-xl" />
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  )
}