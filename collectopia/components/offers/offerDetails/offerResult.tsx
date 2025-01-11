type ComponentProps = {
  offerResult: boolean
}

export default function OfferResult({ offerResult }: ComponentProps) {

  if (offerResult === true) {
    return (
      <div className="flex absolute top-0 bottom-0 left-0 right-0 justify-center group items-center bg-white/70 hover:bg-white/0 duration-100 z-50">
        <p className="text-9xl font-logo text-green-500 opacity-100 duration-100 group-hover:opacity-0">ACCEPTED</p>
      </div>
    )
  } else {
    return (
      <div className="flex absolute top-0 bottom-0 left-0 right-0 justify-center group items-center bg-white/70 hover:bg-white/0 duration-100 z-50">
        <p className="text-9xl font-logo text-red-500 opacity-100 duration-100 group-hover:opacity-0">DECLINED</p>
      </div>
    )
  }
}