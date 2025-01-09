"use client"
import { useState, useEffect } from "react"
import MainInformation from "@/components/profile/mainInformation"
import UsersInventory from "@/components/profile/inventory"
import UserLiveAuctions from "@/components/profile/liveAuctions/userLiveAuctions"
import { useParams } from "next/navigation"

type FetchedUserType = {
  _id: string,
  name: string,
  surname: string,
  interests: string[],
  items: any,
  auctions: any
  createdAt: string,
  followers: string[]
}


export default function UserProfilePage() {

  const { userId } = useParams()
  const [foundUser, setfoundUser] = useState<FetchedUserType>({} as FetchedUserType)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:8080/findUser/${userId}`, {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData: { foundUser: FetchedUserType } = await response.json()
        setfoundUser(resData.foundUser)
        setIsLoading(false)
      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchUser()
  }, [])

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <span id="loader"></span>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col h-auto justify-start items-center ">
        <div className="flex bg-white border-b-orange-300 border-b w-2/3 p-5 shadow-sm shadow-slate-800">
          <MainInformation userInformation={foundUser} userItems={foundUser.items} />
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