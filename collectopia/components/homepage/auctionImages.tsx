import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

type ImageList = string[]

type ComponentProps = {
  imageList: ImageList
  setIsSliding: React.Dispatch<React.SetStateAction<boolean>>

}

import Image from "next/image"
import { useState } from "react"

export default function AuctionImages({ imageList, setIsSliding }: ComponentProps) {

  const [isHover, setIsHover] = useState<boolean>(false)

  function hoverImage() {
    setIsHover(prev => !prev)
    setIsSliding(prev => !prev)
  }



  return (
    <div className="w-full  relative">
      <Carousel className="w-full ">
        <CarouselContent onMouseEnter={() => hoverImage()} onMouseLeave={() => hoverImage()} className={`duration-100 ${isHover ? 'h-64' : 'h-32'}`}>
          {imageList.map((img: string) =>
            <CarouselItem className="relative" key={img}>
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
    </div>
  )
}