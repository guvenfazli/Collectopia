type ComponentProps = {
  fetchedItemInfo?: string | number;
  title: string;
  tagList?: string[]
}



export default function AuctionInformation({ fetchedItemInfo, title, tagList }: ComponentProps) {
  return (
    <div className="flex flex-col w-full justify-start">
      <p className={` font-logo tracking-widest text-lg text-center  text-orange-800`}>{title}</p>
      {fetchedItemInfo && <p className="text-gray-800 tracking-wide text-base">{fetchedItemInfo}</p>}
      {tagList &&
        <div style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }} className="flex overflow-scroll overflow-y-hidden flex-row justify-start items-center gap-1">
          {tagList.map((tag: string) => <p className="text-gray-800 tracking-wide text-sm" key={tag}>#{tag},</p>)}
        </div>}
    </div>
  )
}