import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { FaHome } from "react-icons/fa";
import { IoMdAddCircle, IoMdMegaphone } from "react-icons/io";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import Link from "next/link";
import ItemsForAuctionCreation from "./itemsForAuctionCreation";

export default function HeaderNavigator() {
  return (
    <nav className="flex flex-row justify-around items-center gap-5 text-lg">
      <Link className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/'}><FaHome /></Link>

      <Dialog>
        <DialogTrigger className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300"><IoMdMegaphone /></DialogTrigger>
        <DialogContent className="bg-orange-50 text-lg text-orange-800">
          <DialogHeader>
            <DialogTitle>Create a listing</DialogTitle>
          </DialogHeader>
          <ItemsForAuctionCreation />
        </DialogContent>
      </Dialog>

      <Link className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/addItem'}><IoMdAddCircle /></Link>
      <Link className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/myTrackings'}><GiPayMoney /></Link>
      <Link className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/myAuctions'}><GiReceiveMoney /></Link>
    </nav>
  )
}