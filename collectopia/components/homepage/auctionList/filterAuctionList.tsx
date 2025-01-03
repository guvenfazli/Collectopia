
type Category = {
  category: string, display: string
}

type subCat = {
  [catName: string]: { value: string, display: string }[],
}



type ComponentProps = {
  category: Category[]
  subCategory: subCat
  chooseCategory: React.Dispatch<React.ChangeEvent<HTMLSelectElement>>
  chosenCategory: string
  chooseDate: React.Dispatch<React.ChangeEvent<HTMLInputElement>>
}




export default function FilterAuctionList({ category, subCategory, chooseCategory, chosenCategory, chooseDate }: ComponentProps) {
  return (
    <form className="flex flex-row gap-2">
      <select name="category" onChange={(e) => chooseCategory(e)} required className="shadow-sm shadow-slate-500 p-2 border border-orange-800 rounded-md outline-none">
        <option>Please Select a Category</option>
        {category.map((cat: { category: string, display: string }) => <option value={cat.category} key={cat.category}>{cat.display}</option>)}
      </select>

      <select name="subcategory" required className="shadow-sm shadow-slate-500 p-2 border border-orange-800 rounded-md outline-none">
        <option>Please Select a Subcategory</option>
        {subCategory[chosenCategory].map((subCat: { value: string, display: string }) => <option value={subCat.value} key={subCat.value}>{subCat.display}</option>)}
      </select>

      <input placeholder="Additional Tag" className="border border-orange-800 px-2 bg-orange-300 placeholder:text-orange-200 rounded-md" />

      <input name="deadline" type="date" onChange={(e) => chooseDate(e)} className="bg-orange-300 text-orange-800 font-medium p-2 rounded-lg text-sm placeholder:text-orange-800" />

      <button className="bg-orange-800 text-orange-50 px-5 py-1 rounded-md hover:bg-orange-300 hover:text-orange-800 duration-150 font-logo tracking-widest">
        Filter
      </button>
    </form>
  )
}