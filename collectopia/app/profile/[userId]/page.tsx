import MainInformation from "@/components/profile/mainInformation"
import UsersInventory from "@/components/profile/inventory"
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
      <div className="flex flex-col bg-orange-100 h-screen justify-start items-center shadow-lg">
        <div className="flex bg-white border-b-orange-300 border-b w-2/3 p-5">
          <MainInformation userInformation={resData.foundUser} />
        </div>
        <div className="flex bg-white border-b-orange-800 w-2/3 border p-5">
          <UsersInventory userInventory={resData.foundUser.items} />
        </div>
      </div>
    )

  } catch (err: any) {
    console.log(err.message)
  }

}