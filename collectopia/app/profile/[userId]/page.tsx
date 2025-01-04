"use client"
import { useState, useEffect } from "react"
import MainInformation from "@/components/profile/mainInformation"
import UsersInventory from "@/components/profile/inventory"
import UserLiveAuctions from "@/components/profile/liveAuctions/userLiveAuctions"
import { useParams } from "next/navigation"

export default function UserProfilePage() {

  const { userId } = useParams()
  const [foundUser, setfoundUser] = useState<any>()

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:8080/findUser/${userId}`, {
        credentials: "include"
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()

      setfoundUser(resData.foundUser)
    }

    fetchUser()
  }, [])

  if (foundUser) {
    return (
      <div className="flex flex-col h-auto justify-start items-center ">
        <div className="flex bg-white border-b-orange-300 border-b w-2/3 p-5 shadow-sm shadow-slate-800">
          <MainInformation userInformation={foundUser} />
        </div>

        <div className="flex bg-white border-b-orange-800 w-2/3 p-5 shadow-sm shadow-slate-800">
          <UsersInventory userInventory={foundUser.items} />
        </div>

        <div className="flex bg-white border-b-orange-800 w-2/3 p-5 shadow-sm shadow-slate-800">
          <UserLiveAuctions userAuctions={foundUser.auctions} />
        </div>
      </div>
    )
  }



}