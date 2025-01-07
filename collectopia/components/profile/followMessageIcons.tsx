import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";

type ComponentProps = {
  alreadyFollowed: boolean;
  userId: string;
  loggedInUser: any;
}

export default function FollowMessageIcons({ alreadyFollowed, userId, loggedInUser }: ComponentProps) {

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
      // Will add socket, follow/unfollow re-fetch the userInformation.


      // Will add toast here.

    } catch (err: any) {
      console.log(err.message)
    }
  }
  return (
    <>
      {loggedInUser?.id !== userId &&
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger onClick={() => followUser(userId)} className="p-1 border border-orange-800 bg-orange-600 rounded-3xl text-white hover:bg-orange-400 duration-150">
              {alreadyFollowed ? <RiUserFollowLine /> : <RiUserUnfollowFill />}
            </TooltipTrigger>
            <TooltipContent>
              {alreadyFollowed ? <p>Follow User</p> : <p>Unfollow User</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    </>
  )
}