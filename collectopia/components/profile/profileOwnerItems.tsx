import OfferCard from "./offerCard"

type ComponentProps = {
  userItems: any;
  setChosenItem: React.Dispatch<React.SetStateAction<{ userItems: string[], myItems: string[] }>>
}
export default function ProfileOwnerItems({ userItems, setChosenItem }: ComponentProps) {

  return (
    <div className="flex w-full justify-start items-start gap-2">
      {userItems.length === 0 ? <p>This user has no items.</p> : userItems.map((item: any) => {
        return (
          <OfferCard key={item._id} item={item} setChosenItem={setChosenItem} />
        )
      })}
    </div>
  )
}