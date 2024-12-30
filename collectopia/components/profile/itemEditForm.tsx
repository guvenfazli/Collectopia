import EditFormLabel from "./editFormLabel";

type FetchedItem = {
  _id: string,
  title: string,
  minValue: number,
  buyout: number,
  category: string,
  subCategory: string,
  imageList: string[],
  tagList: string[]
  createdAt: string,
  owner: string,
  isListed: boolean
}

type ComponentProps = {
  fetchedItem: FetchedItem;
}

export default function ItemEditForm({ fetchedItem }: ComponentProps) {
  return (
    <form className="flex flex-col w-full justify-start items-start gap-4">
      <EditFormLabel customFor="title" label="Title" />
      <EditFormLabel customFor="minValue" label="Minimum Value" />
      <EditFormLabel customFor="buyout" label="Buyout" />
      <EditFormLabel customFor="category" label="Category" />
      <EditFormLabel customFor="subcategory" label="Subcategory" />
      <EditFormLabel customFor="tags" label="Tags" />


    </form>
  )
}