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
import Link from "next/link";
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
  fetchedAuction: FetchedAuction;
  ownerId: string
}

export default function AuctionBidSection({ bidList, auctionId, fetchedAuction, ownerId }: ComponentProps) {

  const [isBuyout, setIsBuyout] = useState<boolean>(bidList[0] ? bidList[0].bidValue > fetchedAuction.buyout : false)

  return (
    <div className="flex flex-col justify-between h-full w-1/2 text-wrap">
      {bidList.length <= 0 ? <p className="self-center">No bid placed yet! Be the first one!</p> :
        <Table>
          <TableCaption>Bid List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[250px]">Bid Date</TableHead>
              <TableHead>Bid Time</TableHead>
              <TableHead className="text-right">Bid Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bidList.map((bid: any) =>
              <TableRow key={bid._id}>
                <TableCell className="font-medium">
                  <Link href={`/profile/${bid.bidder._id}`}>{bid.bidder.name + ' ' + bid.bidder.surname}</Link>
                </TableCell>
                <TableCell>
                  {dayjs(bid.createdAt).format("DD/MM/YY")}
                </TableCell>
                <TableCell>
                  {dayjs(bid.createdAt).format("hh:mm")}
                </TableCell>
                <TableCell className="text-right">
                  {bid.bidValue} $
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      }

      <AuctionBidInputField auctionId={auctionId} isBuyout={isBuyout} buyoutValue={fetchedAuction.buyout} ownerId={ownerId} />
    </div>
  )
}