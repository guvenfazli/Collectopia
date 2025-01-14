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

import { Socket } from "socket.io-client"
import { useToast } from "@/hooks/use-toast";
import SendMessageForm from "./sendMessageForm";
import MakeAnOffer from "./makeAnOffer";
import { RiUserFollowFill, RiUserUnfollowFill, RiSwapFill } from "react-icons/ri";
import { BsEnvelopeFill } from "react-icons/bs";
import { useState } from "react";


type ComponentProps = {
  alreadyFollowed: boolean;
  userId: string;
  loggedInUser: any;
  userItems: any;
  socket: Socket | undefined
}

export default function FollowMessageIcons({ alreadyFollowed, userId, loggedInUser, userItems, socket }: ComponentProps) {

  const { toast } = useToast()
  const [open, setOpen] = useState<boolean>(false)


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
      socket?.emit('profileUpdateTrigger')

      toast({
        title: 'Success!',
        description: resData.message,
        className: "bg-green-500 border-none text-white text-xl"
      })
    } catch (err: any) {
      toast({
        title: 'Error!',
        description: err.message,
        className: "bg-red-500 border-none text-white text-xl"
      })
    }
  }
  return (
    <>
      {loggedInUser?.id !== userId &&
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger onClick={() => followUser(userId)} className="p-1 border border-orange-800 bg-orange-800 rounded-3xl text-white hover:bg-orange-600 duration-150">
              {alreadyFollowed ? <RiUserUnfollowFill /> : <RiUserFollowFill />}
            </TooltipTrigger>
            <TooltipContent>
              {alreadyFollowed ? <p>Unfollow User</p> : <p>Follow User</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }

      {loggedInUser?.id !== userId &&
        <Dialog open={open} onOpenChange={setOpen}>
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
            <SendMessageForm userId={userId} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      }

      {loggedInUser?.id !== userId &&
        <Dialog open={open} onOpenChange={setOpen}>
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

          <DialogContent className="bg-orange-50 text-orange-800 flex flex-col border border-orange-800 w-5/6 outline-none">
            <DialogHeader>
              <DialogTitle className="font-logo tracking-widest text-xl">Make an Offer</DialogTitle>
            </DialogHeader>
            <MakeAnOffer userId={userId} userItems={userItems} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      }
    </>
  )
}