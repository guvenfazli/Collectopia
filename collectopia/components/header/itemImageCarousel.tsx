import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type ComponentsProp = {
  imageList: string[]
}

import Image from "next/image"

export default function ItemImageCarousel({ imageList }: ComponentsProp) {



  return (
    <div>
      <Carousel>
        <CarouselContent>
          {imageList.map((img) =>
            <CarouselItem className="h-56 w-96 relative" key={img}>
              <Image
                fill
                alt="uploadedImage"
                src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
                style={{ objectFit: "contain" }}>

              </Image>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  )
}