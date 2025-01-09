import { useEffect, useState } from "react";
import ProfileOwnerItems from "./profileOwnerItems"
import ChosenItemsSection from "./chosenItemsSection";

type ComponentProps = {
  userId: string;
  userItems: any
}

export default function MakeAnOffer({ userId, userItems }: ComponentProps) {

  const [myItems, setMyItems] = useState([])
  const [chosenItems, setChosenItems] = useState({
    userItems: [],
    myItems: []
  })
  /*   const [chosenUserItems, setChosenUserItems] = useState([])
    const [chosenMyItems, setChosenMyItems] = useState([]) */

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
    <div className="flex flex-row justify-start items-center">
      <div className="flex flex-col gap-3 w-full border-r border-r-orange-800">
        <div className="flex flex-col gap-3 w-full">
          <p className="font-logo text-sm border-b border-b-orange-800 w-full">Users Inventory</p>
          <ProfileOwnerItems userItems={userItems} setChosenItems={setChosenItems} />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <p className="font-logo text-sm border-b border-b-orange-800 ">Your Inventory</p>
          <ProfileOwnerItems userItems={myItems} setChosenItems={setChosenItems} />
        </div>
      </div>

      {/* OFFER SECTION */}

      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-3 w-full">
          <p className="font-logo text-sm border-b border-b-orange-800 w-full">You Want</p>
          <ChosenItemsSection chosenItems={chosenItems.userItems} />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <p className="font-logo text-sm border-b border-b-orange-800 ">Your Offer</p>
          <ChosenItemsSection chosenItems={chosenItems.myItems} />
        </div>
      </div>

    </div>
  )
}