"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { RiUserFollowLine } from "react-icons/ri";
import dayjs from "dayjs";
import { useSelector } from "react-redux";


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

  const loggedInUser = useSelector((state: any) => state.auth.userInfo.userInfo)
  const dateData = new Date(userInformation.createdAt)
  const dateDataConverted = dayjs(dateData) // Formats the date

  async function followUser(userId: string) {
    try {

      const response = await fetch(`http://localhost:8080/followUser/${userId}`, {
        method: 'POST',
        credentials: "include"
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData)
        throw error
      }

      const resData = await response.json()
      // Will add socket here, it will trigger the header with the authenticated account update, it will update the following list.
      /* dispatch(authActions.logInUser({ isLogged: true, userInfo: updateFollowing })) */


      // Will add toast here.

    } catch (err: any) {
      console.log(err.message)
    }
  }


  return (
    <div className="flex flex-row w-full justify-between items-end">
      <div className="flex flex-row justify-start items-end gap-5">
        <p className="text-5xl font-medium font-logo text-slate-800 tracking-wider">{userInformation.name + " " + userInformation.surname}</p>
        <p className="text-xl font-medium font-logo text-slate-800"><span className="text-sm font-sans text-slate-600 mr-1">Joined:</span> {dateDataConverted.format("DD/MM/YYYY")}</p>
        {loggedInUser.id !== userInformation._id &&
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger onClick={() => followUser(userInformation._id)} className="p-1 border border-orange-800 bg-orange-600 rounded-3xl text-white hover:bg-orange-400 duration-150">
                <RiUserFollowLine />
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
        {/*       {loggedInUser.following.some((alreadyFollowed: string) => { // Will add socket system, when user follows another user, authenticated account will be triggered and refreshed with socket so it will have updated follow list.

          if (alreadyFollowed === userInformation._id) {
            console.log('Test')
            return (
              <p>You already following this user</p>
            )
          }
        })} */}
      </div>

      <div className="flex flex-row justify-start items-end gap-5">
        <p className="text-sm font-medium text-slate-800">Items Added: <span className="font-bold">{userInformation.items.length}</span></p>
        <p className="text-sm font-medium text-slate-800">Auctions Listed: <span className="font-bold">{userInformation.auctions.length}</span></p>
        <p className="text-sm font-medium text-slate-800">Followers: <span className="font-bold">0</span></p>
      </div>
    </div>
  )
}