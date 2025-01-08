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

import { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import UserHistoryTable from "./userHistoryTable";

type ComponentProps = {
  loggedId: string
}


type EventList = {
  message: string,
  interactionId: any
}


export default function UserHistory({ loggedId }: ComponentProps) {

  const [eventList, setEventList] = useState<EventList[]>([])

  useEffect(() => {
    async function fetchMyEventHistory() {
      try {
        const response = await fetch('http://localhost:8080/fetchMyEventHistory', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setEventList(resData.fetchedEventHistory)


      } catch (err: any) {
        console.log(err.message)
      }
    }
  }, [])



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