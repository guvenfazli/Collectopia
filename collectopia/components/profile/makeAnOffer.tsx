import { useEffect, useState } from "react";
import ProfileOwnerItems from "./profileOwnerItems"
import ChosenItemsSection from "./chosenItemsSection";

type chosenItems = {
  [itemOwner: string]: { userItems: any, myItems: any }[],
}


type ComponentProps = {
  userId: string;
  userItems: any
}

export default function MakeAnOffer({ userId, userItems }: ComponentProps) {

  const [myItems, setMyItems] = useState([])
  const [chosenItems, setChosenItems] = useState<{ userItems: any[], myItems: any[] }>({
    userItems: [],
    myItems: []
  })

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
      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchMyItemsForOffer()
  }, [])

  async function makeTheOffer(userId: string) {
    try {
      if (chosenItems.myItems.length === 0 && chosenItems.userItems.length === 0) {
        const error = new Error("At least one item should be chosen from your or users inventory.")
        throw error
      }

      const response = await fetch(`http://localhost:8080/makeOffer/${userId}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ offer: chosenItems }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()


    } catch (err: any) {
      console.log(err.message)
    }
  }

  return (
    <div className="flex flex-col justify-start items-start">
      <div className="flex flex-row w-full justify-start items-start mb-4 border-b border-b-orange-800">
        <div className="flex flex-col gap-3 w-full border-r border-r-orange-800 h-[500px]">
          <div className="flex flex-col gap-3 h-1/2">
            <p className="font-logo text-sm border-b border-b-orange-800 w-full">Users Inventory</p>
            <ProfileOwnerItems userItems={userItems} profileOwner={true} setChosenItems={setChosenItems} items={"userItems"} />
          </div>

          <div className="flex flex-col gap-3 w-full h-1/2">
            <p className="font-logo text-sm border-b border-b-orange-800 ">Your Inventory</p>
            <ProfileOwnerItems userItems={myItems} profileOwner={false} setChosenItems={setChosenItems} items={"myItems"} />
          </div>
        </div>

        {/* OFFER SECTION */}

        <div className="flex flex-col gap-3 w-full h-[500px]">
          <div className="flex flex-col gap-3 w-full h-1/2">
            <p className="font-logo text-sm border-b border-b-orange-800 w-full">You Want</p>
            <ChosenItemsSection chosenItems={chosenItems.userItems} setChosenItems={setChosenItems} items={"userItems"} />
          </div>

          <div className="flex flex-col gap-3 w-full h-1/2">
            <p className="font-logo text-sm border-b border-b-orange-800 ">Your Offer</p>
            <ChosenItemsSection chosenItems={chosenItems.myItems} setChosenItems={setChosenItems} items={"myItems"} />
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full justify-center items-center">
        <button disabled={chosenItems.myItems.length === 0 && chosenItems.userItems.length === 0} onClick={() => makeTheOffer(userId)} className="w-36 h-12 duration-100 bg-orange-800 rounded-md font-logo text-white hover:bg-orange-600 disabled:pointer-events-none disabled:bg-orange-300">Make the Offer</button>
      </div>

    </div>
  )
}