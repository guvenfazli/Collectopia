"use client"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { Socket, io } from "socket.io-client"
import { authActions, inboxActions, notificationActions } from "@/store/reduxStore"
import Link from "next/link"
import HeaderNavigator from "./headerNavigator"
import HeaderProfileNavigator from "./headerProfileNavigator"
import { redirect } from "next/navigation"

type userInfo = {
  isLogged: true,
  userInfo: {
    id: string,
    name: string,
    interests: string[]
  }
}

type authType = {
  userInfo: userInfo,
  isLogged: boolean
}

export default function Header() {
  const dispatch = useDispatch()

  const userInfo = useSelector((state: { auth: authType }) => state.auth.userInfo)
  const isLogged = useSelector((state: { auth: authType }) => state.auth.isLogged)
  const { toast } = useToast()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const socketConnection = io('http://localhost:8080/myNotifications')
    setSocket(socketConnection)

    socketConnection.emit("createNotificationRoom", userInfo?.userInfo?.id)

    socketConnection.on("getMessage", ({ message, triggerId, triggerType }) => {
      toast({
        title: 'New Notification!',
        description: <Link href={`/${triggerType}/${triggerId}`}>{message}</Link>,
        className: "bg-blue-500 border-none text-white text-xl"
      })
    })

    async function authCheck() { // Checks if the session is active
      try {
        const response = await fetch('http://localhost:8080/auth/authCheck', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()

        dispatch(authActions.logInUser({ isLogged: true, userInfo: resData.userInfo }))
        dispatch(inboxActions.getCount({ messageCount: resData.inboxCount }))
        dispatch(notificationActions.getCount(resData.notifyCount))
        const socketConnection = io('http://localhost:8080/myNotifications')
        setSocket(socketConnection)

        socketConnection.emit("createNotificationRoom", userInfo?.userInfo?.id)
        socketConnection.on("getMessage", ({ message, triggerId, triggerType }) => {
          toast({
            title: 'New Notification!',
            description: <Link href={`/${triggerType}/${triggerId}`}>{message}</Link>,
            className: "bg-blue-500 border-none text-white text-xl"
          })
        })

      } catch (err: any) {
        redirect('/userAuth?mode=login')
      }
    }

    if (!isLogged) {
      authCheck()
    }

    return () => {
      socketConnection.disconnect()
    }

  }, [isLogged])


  if (isLogged) {
    return (
      <header className="flex flex-row justify-between items-center p-4 w-full bg-orange-100 text-orange-800 shadow-sm">

        <div>
          <p className="font-logo text-5xl tracking-wider">Collectopia</p>
        </div>

        <HeaderNavigator socket={socket} />

        <HeaderProfileNavigator loggedName={userInfo.userInfo.name} loggedId={userInfo.userInfo.id} socket={socket} />
      </header>
    )
  }
}