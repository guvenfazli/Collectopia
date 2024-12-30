type ComponentsProp = {
  fetchedItemInfo?: string | number | string[],
  title: string,
  tagList?: string[]
}

export default function CardInformation({ fetchedItemInfo, title, tagList }: ComponentsProp) {
  return (
    <div className="flex flex-col w-full justify-start">
      <p className="text-orange-800 font-logo tracking-widest text-lg text-center">{title}</p>
      {fetchedItemInfo && <p className="text-gray-800 tracking-wide text-base">{fetchedItemInfo}</p>}
      {tagList &&
        <div className="flex flex-row justify-start items-center gap-1 ">
        {tagList.map((tag: string) => <p className="text-gray-800 tracking-wide text-sm" key={tag}>#{tag},</p>)}
        </div>}
    </div>
  )
}