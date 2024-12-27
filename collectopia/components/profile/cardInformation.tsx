type ComponentsProp = {
  fetchedItemInfo: string | number,
  title: string
}

export default function CardInformation({ fetchedItemInfo, title }: ComponentsProp) {
  return (
    <div className="flex flex-col w-full justify-start">
      <p className="text-orange-800 font-logo tracking-widest text-2xl text-center">{title}</p>
      <p className="text-gray-800 tracking-wide text-lg">{fetchedItemInfo}</p>
    </div>
  )
}