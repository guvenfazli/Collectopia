"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useSelector } from "react-redux";
import { useState } from "react";
import FollowMessageIcons from "./followMessageIcons";
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";
import dayjs from "dayjs";

type FetchedUserType = {
  _id: string,
  name: string,
  surname: string,
  interests: string[],
  items: string[],
  auctions: string[]
  createdAt: string,
  followers: string[]
}

type ComponentsProp = {
  userInformation: FetchedUserType
  userItems: any
}


export default function MainInformation({ userInformation, userItems }: ComponentsProp) {

  const loggedInUser = useSelector((state: any) => state.auth.userInfo.userInfo)
  const dateData = new Date(userInformation.createdAt)
  const dateDataConverted = dayjs(dateData) // Formats the date
  const [alreadyFollowed, setAlreadyFollowed] = useState<boolean>(userInformation.followers.some((followerId) => followerId === loggedInUser?.id))

  return (
    <div className="flex flex-row w-full justify-between items-end">
      <div className="flex flex-row justify-start items-end gap-5">
        <p className="text-5xl font-medium font-logo text-slate-800 tracking-wider">{userInformation.name + " " + userInformation.surname}</p>
        <p className="text-xl font-medium font-logo text-slate-800"><span className="text-sm font-sans text-slate-600 mr-1">Joined:</span> {dateDataConverted.format("DD/MM/YYYY")}</p>
        <FollowMessageIcons userId={userInformation._id} alreadyFollowed={alreadyFollowed} loggedInUser={loggedInUser} userItems={userItems} />
      </div>

      <div className="flex flex-row justify-start items-end gap-5">
        <p className="text-sm font-medium text-slate-800">Items Added: <span className="font-bold">{userInformation.items.length}</span></p>
        <p className="text-sm font-medium text-slate-800">Auctions Listed: <span className="font-bold">{userInformation.auctions.length}</span></p>
        <p className="text-sm font-medium text-slate-800">Followers: <span className="font-bold">0</span></p>
      </div>
    </div>
  )
}