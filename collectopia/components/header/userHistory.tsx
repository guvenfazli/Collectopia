import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { MdHistory } from "react-icons/md";
import UserHistoryTable from "./userHistoryTable";
import { useState } from "react";

export default function UserHistory() {

  const [isHistory, setIsHistory] = useState<boolean>(false)


  return (
    <Dialog open={isHistory} onOpenChange={setIsHistory}>
      <DialogTrigger>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <MdHistory />
            </TooltipTrigger>
            <TooltipContent>
              <p>My History</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </DialogTrigger>

      <DialogContent className="bg-orange-50 text-lg text-orange-800 flex flex-col border w-1/2 border-orange-800">
        <DialogHeader>
          <DialogTitle className="font-logo tracking-widest text-xl">History</DialogTitle>
        </DialogHeader>
        <UserHistoryTable setIsHistory={setIsHistory} />
      </DialogContent>

    </Dialog>
  )
}