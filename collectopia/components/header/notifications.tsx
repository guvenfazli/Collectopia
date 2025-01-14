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

import NotificationList from "./NotificationList";
import { IoNotifications } from "react-icons/io5";



export default function Notifications() {

  return (
    <Dialog>
      <DialogTrigger>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <IoNotifications />
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </DialogTrigger>

      <DialogContent className="bg-orange-50 text-lg text-orange-800 flex flex-col border w-1/2 border-orange-800">
        <DialogHeader>
          <DialogTitle className="font-logo tracking-widest text-xl">Notifications</DialogTitle>
        </DialogHeader>
        <NotificationList />
      </DialogContent>

    </Dialog>
  )
}