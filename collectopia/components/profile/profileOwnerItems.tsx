import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import OfferCard from "./offerCard"

type ComponentProps = {
  userItems: any;
  setChosenItems: React.Dispatch<React.SetStateAction<{ userItems: string[], myItems: string[] }>>
  items: string
}
export default function ProfileOwnerItems({ userItems, setChosenItems, items }: ComponentProps) {




  return (
    <div style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }} className="flex w-full justify-start items-start overflow-scroll overflow-y-hidden gap-2 flex-nowrap">
      {userItems.length === 0 ? <p className="self-center">This user has no items.</p> : userItems.map((item: any) =>
        <OfferCard key={item._id} item={item} setChosenItems={setChosenItems} items={items} />
      )}
    </div>
  )
}