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

import { MdHistory } from "react-icons/md";
import UserHistoryTable from "./userHistoryTable";

type ComponentProps = {
  loggedId: string
}

export default function UserHistory({ loggedId }: ComponentProps) {

  return (
    <Dialog>
      <DialogTrigger>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <MdHistory />
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a Listing</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </DialogTrigger>

      <DialogContent className="bg-orange-50 text-lg text-orange-800 flex flex-col border border-orange-800">
        <DialogHeader>
          <DialogTitle className="font-logo tracking-widest text-xl">History</DialogTitle>
        </DialogHeader>
        <UserHistoryTable />
      </DialogContent>

    </Dialog>
  )
}