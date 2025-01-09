import ChosenOfferCard from "./chosenOfferCard"

type ComponentProps = {
  chosenItems: any
  setChosenItems: React.Dispatch<React.SetStateAction<{ userItems: string[], myItems: string[] }>>
  items: string
}



export default function ChosenItemsSection({ chosenItems, setChosenItems, items }: ComponentProps) {
  return (
    <div style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }} className="flex w-full justify-start items-start overflow-scroll overflow-y-hidden  gap-2 flex-nowrap">
      {chosenItems.length === 0 ? <p>No Item Chosen.</p> : chosenItems.map((item: any) => {
        return (
          <ChosenOfferCard key={item._id} item={item} setChosenItems={setChosenItems} items={items} />
        )
      })}
    </div>
  )
}