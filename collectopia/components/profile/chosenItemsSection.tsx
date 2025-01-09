import ChosenOfferCard from "./chosenOfferCard"

type ComponentProps = {
  chosenItems: any
}



export default function ChosenItemsSection({ chosenItems }: ComponentProps) {
  return (
    <div className="flex w-full justify-start items-start gap-2">
      {chosenItems.length === 0 ? <p>This user has no items.</p> : chosenItems.map((item: any) => {
        return (
          <ChosenOfferCard key={item._id} item={item} />
        )
      })}
    </div>
  )
}