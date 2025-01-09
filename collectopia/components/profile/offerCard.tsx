import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Image from "next/image"

type ComponentProps = {
  item: any;
  setChosenItems: React.Dispatch<React.SetStateAction<{ userItems: string[], myItems: string[] }>>
  items: string;
}

export default function OfferCard({ item, setChosenItems, items }: ComponentProps) {

  function chooseItem(items: string, item: any) {
    setChosenItems((prev) => {
      const updated = { ...prev }
      const alreadyAdded = updated[items].some((alreadAddedItem: any) => alreadAddedItem._id === item._id)

      if (alreadyAdded) {
        return updated
      } else {
        updated[items].push(item)
        return updated
      }

    })
  }


  return (
    <div className="flex flex-col w-1/4">
      <div onClick={() => chooseItem(items, item)}>
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