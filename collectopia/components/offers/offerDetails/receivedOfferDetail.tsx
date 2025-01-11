import Link from "next/link";
import OfferDetailItemCard from "./offerDetailItemCard"
import dayjs from "dayjs"

type Offer = {
  offeredItems: { imageList: string[], title: string, _id: string }[];
  wantedItems: { imageList: string[], title: string, _id: string }[];
}

type Offerer = {
  name: string;
  surname: string;
  _id: string;
}

type ComponentProps = {
  chosenOffer: {
    offer: {
      createdAt: string;
      offer: Offer;
      offerAccepted: boolean;
      offerActive: boolean
      offerer: Offerer;
      receiver: string;
      updatedAt: string;
      _id: string
    };
  }
}

export default function ReceivedOfferDetail({ chosenOffer }: ComponentProps) {

  console.log(chosenOffer)

  async function selectOption(offerId: string, option: string) {
    try {
      const response = await fetch(`http://localhost:8080/selectOption/${offerId}?selectedOption=${option}`, {
        method: "PATCH",
        credentials: "include",
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()
      console.log(resData)
    } catch (err: any) {
      console.log(err.message)
    }
  }


  return (
    <div className="flex flex-col w-full justify-start items-start gap-3 bg-orange-200 p-1 rounded-md shadow-[0px_4px_8px_rgba(0,0,0,0.1),0px_2px_4px_rgba(255,165,0,0.15)]">

      <div className="flex w-full justify-around items-center gap-3">
        <button onClick={() => selectOption(chosenOffer.offer._id, "accept")} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-orange-100/50 hover:bg-green-600 hover:shadow-xl duration-200">Accept Offer</button>
        <button onClick={() => selectOption(chosenOffer.offer._id, "decline")} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-orange-100/50 hover:bg-red-600 hover:shadow-xl duration-200">Decline Offer</button>
      </div>

      <div className="flex w-full justify-between px-2 border-b border-b-orange-800">
        <Link href={`/profile/${chosenOffer.offer.offerer._id}`} className="text-xl font-logo tracking-wider text-orange-800">
          Sent By: <span className="hover:underline">{chosenOffer.offer.offerer.name + ' ' + chosenOffer.offer.offerer.surname}</span>
        </Link>
        <p>Offer Sent At: {dayjs(chosenOffer.offer.createdAt).startOf("day").format("DD/MM/YY")}</p>
      </div>

      <div className="flex flex-row w-full justify-start items-start gap-2 p-1 overflow-scroll overflow-y-hidden border-b border-b-orange-800" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {chosenOffer.offer.offer.offeredItems.map((offeredItem: any) => <OfferDetailItemCard key={offeredItem._id} offeredItem={offeredItem} />)}
      </div>

      <div className="flex flex-row w-full justify-start items-start gap-2 p-1 overflow-scroll overflow-y-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: "#9A3412 transparent", WebkitOverflowScrolling: "touch" }}>
        {chosenOffer.offer.offer.wantedItems.map((wantedItem: any) => <OfferDetailItemCard key={wantedItem._id} offeredItem={wantedItem} />)}
      </div>

      <div className="flex w-full pt-1 px-2 border-t border-t-orange-800">
        <p className="text-xl font-logo tracking-wider text-orange-800">You</p>
      </div>

    </div>

  )
}