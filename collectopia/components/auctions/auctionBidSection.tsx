import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { BaseSyntheticEvent } from "react"
import AuctionBidInputField from "./auctionBidInputField"
import dayjs from "dayjs"
type ComponentProps = {
  bidList: any // Will Change,
  auctionId: string
}

export default function AuctionBidSection({ bidList, auctionId }: ComponentProps) {

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


  console.log(bidList)

  return (
    <form method="POST" encType="multipart/form-data" onSubmit={(e) => bidForAuction(e)} className="flex flex-col justify-between h-full w-1/2 text-wrap">
      {bidList.length <= 0 ? <p>No bid placed yet! Be the first one!</p> :
        <Table>
          <TableCaption>Bid List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Bid Date</TableHead>
              <TableHead className="text-right">Bid Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bidList.map((bid: any) =>
              <TableRow key={bid._id}>
                <TableCell className="font-medium">
                  {bid.bidder.name}
                </TableCell>
                <TableCell>
                  {dayjs(bid.createdAt).format("DD/MM/YY")}
                </TableCell>
                <TableCell className="text-right">
                  {bid.bidValue} $
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      }


      <AuctionBidInputField />
    </form>
  )
}