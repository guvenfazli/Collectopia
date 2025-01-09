import OfferCard from "./offerCard"

type ComponentProps = {
  userItems: any;
  setChosenItems: React.Dispatch<React.SetStateAction<{ userItems: string[], myItems: string[] }>>
  items: string
}
export default function ProfileOwnerItems({ userItems, setChosenItems, items }: ComponentProps) {

 


  return (
    <div className="flex w-full justify-start items-start gap-2">
      {userItems.length === 0 ? <p>This user has no items.</p> : userItems.map((item: any) => {
        return (
          <OfferCard key={item._id} item={item} setChosenItems={setChosenItems} items={items} />
        )
      })}
    </div>
  )
}