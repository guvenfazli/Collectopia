import ChosenOfferCard from "./chosenOfferCard"

type ComponentProps = {
  chosenItems: any
  setChosenItems: React.Dispatch<React.SetStateAction<{ userItems: string[], myItems: string[] }>>
  items: string
}



export default function ChosenItemsSection({ chosenItems, setChosenItems, items }: ComponentProps) {
  return (
    <div className="flex w-full justify-start items-start gap-2">
      {chosenItems.length === 0 ? <p>This user has no items.</p> : chosenItems.map((item: any) => {
        return (
          <ChosenOfferCard key={item._id} item={item} setChosenItems={setChosenItems} items={items} />
        )
      })}
    </div>
  )
}