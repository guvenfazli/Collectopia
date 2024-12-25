import TitlePrice from "./titlePrice"
import CategoryDate from "./categoryDate"
import ChooseFileAndSubmit from "./chooseFileAndSubmit"
export default function ItemCreationForm() {
  return (
    <form className="flex flex-col w-full justify-start-start gap-4">
      <div className="flex flex-row w-full items-start">
        <TitlePrice />
        <CategoryDate />
      </div>
      <ChooseFileAndSubmit />
    </form>
  )
}