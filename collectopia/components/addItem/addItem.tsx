import ImageShowcase from "./imageShowcase"
import ItemInformation from "./itemInformation"
export default function AddItem() {
  return (
    <div className="flex flex-col bg-blue-50 justify-start p-3 w-5/12 border text-blue-800 border-blue-900 rounded-lg">
      <ImageShowcase />
      <ItemInformation />
    </div>
  )
}