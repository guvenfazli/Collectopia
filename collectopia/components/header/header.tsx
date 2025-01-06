"use client"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { authActions } from "@/store/reduxStore"
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

  useEffect(() => {
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

      } catch (err: any) {
        console.log(err.message)
        redirect('/userAuth?mode=login')
      }
    }

    if (!isLogged) {
      authCheck()
    }
  }, [isLogged])


  if (isLogged) {
    return (
      <header className="flex flex-row justify-between items-center p-4 w-full bg-orange-100 text-orange-800 shadow-sm">

        <div>
          <p className="font-logo text-5xl tracking-wider">Collectopia</p>
        </div>

        <HeaderNavigator />

        <HeaderProfileNavigator loggedName={userInfo.userInfo.name} loggedId={userInfo.userInfo.id} />


      </header>
    )
  }
}