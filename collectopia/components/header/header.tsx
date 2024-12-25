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
      <div className="flex flex-row justify-around items-start p-4 border w-full bg-orange-800 text-white">
        <div>
          <p className=" text-3xl">Collectopia</p>
        </div>

        <div>
          <p className="text-3xl">Welcome back {userInfo.userInfo.name}!</p>
        </div>

      </div>
    )
  }
}