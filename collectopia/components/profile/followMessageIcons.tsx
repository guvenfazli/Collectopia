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

import SendMessageForm from "./sendMessageForm";
import MakeAnOffer from "./makeAnOffer";
import { RiUserFollowLine, RiUserUnfollowFill, RiSwapFill } from "react-icons/ri";
import { BsEnvelopeFill } from "react-icons/bs";


type ComponentProps = {
  alreadyFollowed: boolean;
  userId: string;
  loggedInUser: any;
  userItems: any
}

export default function FollowMessageIcons({ alreadyFollowed, userId, loggedInUser, userItems }: ComponentProps) {

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
            <TooltipTrigger onClick={() => followUser(userId)} className="p-1 border border-orange-800 bg-orange-800 rounded-3xl text-white hover:bg-orange-600 duration-150">
              {alreadyFollowed ? <RiUserFollowLine /> : <RiUserUnfollowFill />}
            </TooltipTrigger>
            <TooltipContent>
              {alreadyFollowed ? <p>Follow User</p> : <p>Unfollow User</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }

      {loggedInUser?.id !== userId &&
        <Dialog>
          <DialogTrigger className="p-1 border border-orange-800 bg-orange-800 rounded-3xl text-white hover:bg-orange-600 duration-150">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <BsEnvelopeFill />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send a Message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>

          <DialogContent className="bg-orange-50 text-orange-800 flex flex-col border border-orange-800 w-1/4">
            <DialogHeader>
              <DialogTitle className="font-logo tracking-widest text-xl">Send a Message</DialogTitle>
            </DialogHeader>
            <SendMessageForm userId={userId} />
          </DialogContent>
        </Dialog>
      }

      {loggedInUser?.id !== userId &&
        <Dialog>
          <DialogTrigger className="p-1 border border-orange-800 bg-orange-800 rounded-3xl text-white hover:bg-orange-600 duration-150">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <RiSwapFill />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Make an Offer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>

          <DialogContent className="bg-orange-50 text-orange-800 flex flex-col border border-orange-800 w-5/6">
            <DialogHeader>
              <DialogTitle className="font-logo tracking-widest text-xl">Make an Offer</DialogTitle>
            </DialogHeader>
            <MakeAnOffer userId={userId} userItems={userItems} />
          </DialogContent>
        </Dialog>
      }
    </>
  )
}