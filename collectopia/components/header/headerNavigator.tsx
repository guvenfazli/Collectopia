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

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/'}><FaHome /></Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Home</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>


      <Dialog>
        <DialogTrigger className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300">

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <IoMdMegaphone />
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a Listing</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </DialogTrigger>

        <DialogContent className="bg-orange-50 text-lg text-orange-800 flex flex-col border border-orange-800">
          <DialogHeader>
            <DialogTitle className="font-logo tracking-widest text-xl">Create a listing <span className="text-sm font-general tracking-wide">(Click the name of the item that you want to list.)</span></DialogTitle>
          </DialogHeader>
          <ItemsForAuctionCreation />
        </DialogContent>

      </Dialog>




      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/addItem'}><IoMdAddCircle /></Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add an Item</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/myTrackings'}><GiPayMoney /></Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>My Trackings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className="shadow-sm shadow-orange-800 hover:shadow-md hover:shadow-orange-900 transition-all duration-200 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/myAuctions'}><GiReceiveMoney /></Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>My Auctions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>


    </nav>
  )
}