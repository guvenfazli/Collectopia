import { useEffect, useState } from "react";
import ProfileOwnerItems from "./profileOwnerItems"
type ComponentProps = {
  userId: string;
  userItems: any
}

export default function MakeAnOffer({ userId, userItems }: ComponentProps) {

  const [myItems, setMyItems] = useState([])

  useEffect(() => {
    async function fetchMyItemsForOffer() {
      try {
        const response = await fetch('http://localhost:8080/fetchMyItemsForOffer', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setMyItems(resData.myItemsForOffer.items)
        console.log(resData)
      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchMyItemsForOffer()
  }, [])


  return (
    <div className="flex flex-row justify-start items-start">
      <div className="flex flex-col gap-3 border-b border-b-orange-800 w-full">
        <div className="flex flex-col gap-3 border-b border-b-orange-800 w-full">
          <p className="font-logo text-sm">Users Inventory</p>
          <ProfileOwnerItems userItems={userItems} />
        </div>

        <div className="flex flex-col gap-3 border-b border-b-orange-800 w-full">
          <p className="font-logo text-sm">Your Inventory</p>
          <ProfileOwnerItems userItems={myItems} />
        </div>
      </div>
    </div>
  )
}