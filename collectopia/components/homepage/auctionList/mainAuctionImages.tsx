import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"

type ImageList = string[]

type ComponentProps = {
  imageList: ImageList
}

export default function MainAuctionImages({ imageList }: ComponentProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className={`duration-100 h-44`}>
        {imageList.map((img: string) =>
          <CarouselItem className="relative " key={img}>
            <div className="absolute blur-sm top-0 right-0 bottom-0 left-0" style={{ background: `url(http://localhost:8080/${img.replaceAll(/\\/g, "/")})`, backgroundPosition: "center", backgroundSize: "contain" }} />
            <Image
              fill
              alt="uploadedImage"
              src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
              style={{ objectFit: `contain` }} />
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  )
}