import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Image from "next/image"

type ComponentProps = {
  item: any
}

export default function OfferCard({ item }: ComponentProps) {
  return (
    <div className="flex flex-col w-1/4">
      <div>
        <Carousel className="w-full">
          <CarouselContent className="h-44">
            {item.imageList.map((img: string) =>
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
      </div>

      <div>
        {item.title}
      </div>
    </div>
  )
}