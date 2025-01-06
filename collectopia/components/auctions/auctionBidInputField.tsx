import { BaseSyntheticEvent } from "react"

type ComponentProps = {
  auctionId: string;
  isBuyout: boolean;
  buyoutValue: number;
}



export default function AuctionBidInputField({ auctionId, isBuyout, buyoutValue }: ComponentProps) {

  async function bidForAuction(e: BaseSyntheticEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const response = await fetch(`http://localhost:8080/bidAuction/${auctionId}`, {
        method: "POST",
        credentials: "include",
        body: formData
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
    <div className="flex w-full items-center justify-between gap-4">
      <form onSubmit={(e) => bidForAuction(e)} className="flex w-full items-center justify-between gap-4">
        <input required name="bid" placeholder="Place your Bid" className="placeholder:text-orange-300 p-3 bg-orange-100 border border-orange-800 w-full text-orange-800 font-semibold outline-none" />
        <button className="px-5 py-3 bg-orange-800 font-logo h-full text-white duration-100 rounded-sm hover:bg-orange-300 hover:text-orange-800">Bid</button>
      </form>

      <form className="flex w-full items-center justify-between gap-4">
        <input required disabled={isBuyout} name="buyout" placeholder={`Buyout (${buyoutValue} $)`} className="placeholder:text-orange-300 p-3 bg-orange-100 border border-orange-800 w-full text-orange-800 font-semibold outline-none disabled:opacity-35" />
        <button disabled={isBuyout} className="p-3 bg-orange-800 font-logo text-white duration-100 rounded-sm hover:bg-orange-300 hover:text-orange-800 disabled:bg-orange-200 disabled:pointer-events-none">Buyout</button>
      </form>
    </div>
  )
}