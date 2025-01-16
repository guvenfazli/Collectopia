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

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { notificationActions } from "@/store/reduxStore"
import NotificationList from "./NotificationList";
import { IoNotifications } from "react-icons/io5";



export default function Notifications() {

  const notificationCount = useSelector((state: any) => state.notificationCount.notificationCount)
  const dispatch = useDispatch()

  function markAsRead() {
    dispatch(notificationActions.controlCount())
  }

  return (
    <Dialog>
      <DialogTrigger onClick={markAsRead}>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <p className="absolute w-4 h-4 bg-white rounded-full text-orange-800 text-xs text-center -top-3 -right-3">{notificationCount}</p>
                <IoNotifications />
              </div>
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

    </Dialog >
  )
}