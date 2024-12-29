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
    <div>
      <div className="flex w-full border items-center mb-4 overflow-hidden relative h-96">
        {imageShowcase.length === 0 && <div className="flex w-full justify-center items-center"><p>You did not choose any image yet!</p></div>}
        <Carousel className="w-full">
          <CarouselContent className="h-96 border border-red-700">
            {imageShowcase.map((img) =>
              <CarouselItem className="relative" key={img}>
                <Image
                  fill
                  alt="uploadedImage"
                  src={img.replaceAll(/\\/g, "/")}
                  style={{ objectFit: "contain" }} />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>

{/*       <div className="flex flex-row justify-between items-center">
        <button onClick={() => setImageNavigator(prev => prev -= 1)} disabled={imageNavigator === 0 || imageShowcase.length === 0} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-transform duration-150 ease-in-out disabled:bg-blue-300">&lt;</button>
        <button onClick={() => setImageNavigator(prev => prev += 1)} disabled={imageNavigator === imageShowcase.length - 1 || imageShowcase.length === 0} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-transform duration-150 ease-in-out disabled:bg-blue-300">&gt;</button>
      </div> */}

    </div>
  )
}