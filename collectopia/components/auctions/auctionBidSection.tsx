import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import AuctionBidInputField from "./auctionBidInputField"
import dayjs from "dayjs"
import { useState } from "react";

type FetchedAuction = {
  auctionTag: string;
  bidList: any;
  deadline: number;
  buyout: number;
  createdAt: string;
  followers: any;
  item: any;
  minValue: number;
  seller: string;
  _id: string
}

type ComponentProps = {
  bidList: any // Will Change,
  auctionId: string;
  fetchedAuction: FetchedAuction
}

export default function AuctionBidSection({ bidList, auctionId, fetchedAuction }: ComponentProps) {

  const [isBuyout, setIsBuyout] = useState<boolean>(bidList[0] ? bidList[0].bidValue > fetchedAuction.buyout : false)



  return (
    <div className="flex flex-col justify-between h-full w-1/2 text-wrap">
      {bidList.length <= 0 ? <p>No bid placed yet! Be the first one!</p> :
        <Table>
          <TableCaption>Bid List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Bid Date</TableHead>
              <TableHead>Bid Time</TableHead>
              <TableHead className="text-right">Bid Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bidList.map((bid: any) =>
              <TableRow key={bid._id}>
                <TableCell className="font-medium">
                  {bid.bidder.name + ' ' + bid.bidder.surname}
                </TableCell>
                <TableCell>
                  {dayjs(bid.createdAt).format("DD/MM/YY")}
                </TableCell>
                <TableCell>
                  {dayjs(bid.createdAt).get("hours") + ':' + dayjs(bid.createdAt).get("minutes")}
                </TableCell>
                <TableCell className="text-right">
                  {bid.bidValue} $
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      }
      <AuctionBidInputField auctionId={auctionId} isBuyout={isBuyout} />
    </div>
  )
}