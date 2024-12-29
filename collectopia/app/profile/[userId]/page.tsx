import MainInformation from "@/components/profile/mainInformation"
import UsersInventory from "@/components/profile/inventory"
import UserLiveAuctions from "@/components/profile/liveAuctions/userLiveAuctions"
import { cookies } from "next/headers"
export default async function UserProfilePage({ params }: any) {

  const { userId } = await params
  const cookie = await cookies()

  try {
    const response = await fetch(`http://localhost:8080/findUser/${userId}`, {
      headers: { Cookie: cookie.toString() }
    })

    if (!response.ok) {
      const resData = await response.json()
      const error = new Error(resData.message)
      throw error
    }

    const resData = await response.json()
    

    return (
      <div className="flex flex-col h-auto justify-start items-center ">
        <div className="flex bg-white border-b-orange-300 border-b w-2/3 p-5 shadow-sm shadow-slate-800">
          <MainInformation userInformation={resData.foundUser} />
        </div>

        <div className="flex bg-white border-b-orange-800 w-2/3 p-5 shadow-sm shadow-slate-800">
          <UsersInventory userInventory={resData.foundUser.items} />
        </div>

        <div className="flex bg-white border-b-orange-800 w-2/3 p-5 shadow-sm shadow-slate-800">
          <UserLiveAuctions userAuctions={resData.foundUser.auctions} />
        </div>
      </div>
    )

  } catch (err: any) {
    console.log(err.message)
  }

}