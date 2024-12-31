"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { RiUserFollowLine } from "react-icons/ri";
import dayjs from "dayjs";

type FetchedUserType = {
  _id: string,
  name: string,
  surname: string,
  interests: string[],
  items: string[],
  auctions: string[]
  createdAt: string
}

type ComponentsProp = {
  userInformation: FetchedUserType
}


export default function MainInformation({ userInformation }: ComponentsProp) {

  const dateData = new Date(userInformation.createdAt)
  const dateDataConverted = dayjs(dateData) // Formats the date


  return (
    <div className="flex flex-row w-full justify-between items-end">
      <div className="flex flex-row justify-start items-end gap-5">
        <p className="text-5xl font-medium font-logo text-slate-800 tracking-wider">{userInformation.name + " " + userInformation.surname}</p>
        <p className="text-xl font-medium font-logo text-slate-800"><span className="text-sm font-sans text-slate-600 mr-1">Joined:</span> {dateDataConverted.format("DD/MM/YYYY")}</p>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="p-1 border bg-orange-600 rounded-3xl text-white hover:bg-orange-400 duration-150">
              <RiUserFollowLine />
            </TooltipTrigger>
            <TooltipContent>
              <p>Follow User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>

      <div className="flex flex-row justify-start items-end gap-5">
        <p className="text-sm font-medium text-slate-800">Items Added: <span className="font-bold">{userInformation.items.length}</span></p>
        <p className="text-sm font-medium text-slate-800">Auctions Listed: <span className="font-bold">{userInformation.auctions.length}</span></p>
        <p className="text-sm font-medium text-slate-800">Followers: <span className="font-bold">0</span></p>
      </div>
    </div>
  )
}