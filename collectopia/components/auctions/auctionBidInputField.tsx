import { BaseSyntheticEvent } from "react"
import { useSelector } from "react-redux"
type ComponentProps = {
  auctionId: string;
  isBuyout: boolean;
  buyoutValue: number;
  ownerId: string;
}



export default function AuctionBidInputField({ auctionId, isBuyout, buyoutValue, ownerId }: ComponentProps) {

  const authUserId = useSelector((state: any) => state.auth.userInfo.userInfo.id)

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

  async function buyoutAuction(e: BaseSyntheticEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const response = await fetch(`http://localhost:8080/buyoutAuction/${auctionId}`, {
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
        <input disabled={ownerId === authUserId} required name="bid" placeholder="Place your Bid" className="placeholder:text-orange-300 p-3 bg-orange-100 border border-orange-800 w-full text-orange-800 font-semibold outline-none disabled:opacity-35" />

        <button disabled={ownerId === authUserId} className="px-5 py-3 bg-orange-800 font-logo h-full text-white duration-100 rounded-sm hover:bg-orange-300 hover:text-orange-800 disabled:bg-orange-200 disabled:pointer-events-none">
          Bid
        </button>
      </form>

      <form onSubmit={(e) => buyoutAuction(e)} className="flex w-full items-center justify-between gap-4">
        <input required disabled={isBuyout || ownerId === authUserId} name="buyout" placeholder={`Buyout (${buyoutValue} $)`} className="placeholder:text-orange-300 p-3 bg-orange-100 border border-orange-800 w-full text-orange-800 font-semibold outline-none disabled:opacity-35" />

        <button disabled={isBuyout || ownerId === authUserId} className="p-3 bg-orange-800 font-logo text-white duration-100 rounded-sm hover:bg-orange-300 hover:text-orange-800 disabled:bg-orange-200 disabled:pointer-events-none">
          Buyout
        </button>
      </form>
    </div>
  )
}