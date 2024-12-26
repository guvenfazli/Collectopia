import ItemCreationForm from "./itemCreationForm"


export default function ItemInformation({ setImageShowcase }) {
  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex flex-row w-full justify-center items-center">
        <p className=" font-semibold text-2xl tracking-widest font-logo">Auction Details</p>
      </div>

      <ItemCreationForm setImageShowcase={setImageShowcase} />
    </div>
  )
}