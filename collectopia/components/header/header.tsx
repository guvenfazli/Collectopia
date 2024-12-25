"use client"
import { useSelector } from "react-redux"

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

  const userInfo = useSelector((state: { auth: authType }) => state.auth.userInfo)
  const isLogged = useSelector((state: { auth: authType }) => state.auth.isLogged)
  console.log(userInfo)

  if (isLogged) {
    return (
      <header className="flex  flex-row justify-between items-center p-4 w-full bg-orange-100 text-orange-800 shadow-sm">
        
        <div>
          <p className="font-logo text-5xl">Collectopia</p>
        </div>

        <div>
          <p className="text-3xl">Welcome back {userInfo.userInfo.name}!</p>
        </div>

      </header>
    )
  }
}