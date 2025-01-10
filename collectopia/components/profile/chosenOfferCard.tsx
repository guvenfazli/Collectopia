import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Image from "next/image"

type ComponentProps = {
  item: any;
  setChosenItems: React.Dispatch<React.SetStateAction<{ userItems: string[], myItems: string[] }>>
  items: string
}

export default function ChosenOfferCard({ item, setChosenItems, items }: ComponentProps) {

  function removeChosenItem(items: string, item: any) {
    setChosenItems((prev) => {
      const updated = { ...prev }
      const alreadAddedIndex = updated[items].findIndex((alreadAddedItem: any) => alreadAddedItem._id === item._id)
      updated[items].splice(alreadAddedIndex, 1)
      return updated
    })
  }




  return (
    <div className="flex flex-col w-1/4 flex-shrink-0">
      <div onClick={() => removeChosenItem(items, item)}>
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
        <p className="text-sm">{item.title}</p>
      </div>
    </div>
  )
}