import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import Link from "next/link"
import UserHistory from "./userHistory"
import Notifications from "./notifications"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Socket } from "socket.io-client"
import { useDispatch } from "react-redux"
import { authActions } from "@/store/reduxStore"
import { BsFillPersonFill, BsEnvelopeFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";

type reduxType = {
  inboxCount: {
    messageCount: {
      messageCount: number
    }
  }
}

type ComponentType = {
  loggedName: string;
  loggedId: string;
  socket: Socket | undefined
}


export default function HeaderProfileNavigator({ loggedName, loggedId, socket }: ComponentType) {

  const router = useRouter()
  const dispatch = useDispatch()
  const messageCount = useSelector((state: reduxType) => state.inboxCount.messageCount.messageCount)

  async function logOut() {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        credentials: "include"
      })
      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }
      router.push('/userAuth?mode=login')
      const resData = await response.json()
      const deleteAuth = setTimeout(() => {
        dispatch(authActions.logOutUser({ isLogged: false, userInfo: undefined }))
      }, 100)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  console.log(messageCount)

  return (
    <nav className="flex flex-row justify-around items-center gap-5 text-lg">
      <p>Welcome back <span className="font-logo font-medium text-xl ml-1">{loggedName && loggedName}</span></p>

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className="scale-105" href={`/profile/${loggedId && loggedId}`}><BsFillPersonFill /></Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <UserHistory />

      <Notifications />

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={'/inbox?mode=recieved'}><BsEnvelopeFill /></Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Inbox</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={logOut}><IoLogOut /></button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </nav>
  )
}