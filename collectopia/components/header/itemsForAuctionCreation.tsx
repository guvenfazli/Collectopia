"use client"

import { useState, useEffect } from "react"

type FetchedItem = {
  _id: string,
  title: string,
  minValue: number,
  buyout: number,
  category: string,
  subCategory: string,
  imageList: string[],
  tagList: string[]
  createdAt: string
}

type FetchedItems = FetchedItem[]

export default function ItemsForAuctionCreation() {

  const [myItems, setMyItems] = useState<FetchedItems>([])
  const [isError, setIsError] = useState<boolean | string>(false)

  useEffect(() => {
    async function fetchMyItems() {
      try {
        const response = await fetch('http://localhost:8080/fetchMyItems', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        console.log(resData)
        setMyItems(resData.foundItems)

      } catch (err: any) {
        setIsError(err.message)
      }
    }

    fetchMyItems()
  }, [])





  return (
    <div className="flex flex-col justify-start items-start gap-1">
      {isError && <p>{isError}</p>}
      <div className="flex flex-row justify-between items-center w-full">
        {myItems.map((item) => <p key={item._id}>{item.title}</p>)}
      </div>

    </div>
  )
}