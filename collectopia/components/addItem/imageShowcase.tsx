import { useState, useEffect } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type componentPropType = {
  imageShowcase: string[]
}

export default function ImageShowcase({ imageShowcase }: componentPropType) {

  const [imageNavigator, setImageNavigator] = useState<number>(0)

  useEffect(() => { // Resets navigator if new images uploaded
    setImageNavigator(0)
  }, [imageShowcase, setImageNavigator])

  return (

    <div className="flex w-full items-center mb-4 overflow-hidden relative h-96">
      {imageShowcase.length === 0 ? <div className="flex w-full justify-center items-center"><p>You did not choose any image yet!</p></div> :
        <Carousel className="w-full">
          <CarouselContent className="h-96">
            {imageShowcase.map((img) =>
              <CarouselItem className="relative" key={img}>
                <div className="absolute blur-sm top-0 right-0 bottom-0 left-0" style={{ background: `url(${img.replaceAll(/\\/g, "/")})`, backgroundPosition: "center", backgroundSize: "contain" }} />
                <Image
                  fill
                  alt="uploadedImage"
                  src={img.replaceAll(/\\/g, "/")}
                  style={{ objectFit: "contain" }} />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      }
    </div>

  )
}