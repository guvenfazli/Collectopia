import ItemCreationForm from "./itemCreationForm"
type ComponentPropType = {
  setImageShowcase: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ItemInformation({ setImageShowcase }: ComponentPropType) {
  return (
    <div className="flex flex-col gap-5 items-start justify-start">
      <div className="flex flex-row w-full justify-center items-center">
        <p className=" font-semibold text-2xl tracking-widest font-logo">Item Details</p>
      </div>

      <ItemCreationForm setImageShowcase={setImageShowcase} />
    </div>
  )
}