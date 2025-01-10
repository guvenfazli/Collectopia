type ComponentProps = {
  chosenOffer: {
    offer: any,
    offerer: string | { _id: string, name: string, surname: string }
  }
}


export default function SentOfferDetail({ chosenOffer }: ComponentProps) {
  return (
    <div>
      <p>Sent offer detail.</p>
    </div>
  )
}