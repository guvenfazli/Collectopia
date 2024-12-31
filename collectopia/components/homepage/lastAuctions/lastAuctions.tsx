"use client"
import { useEffect, useState } from "react"

export default function LastAuctions() {

  const [fetchedLastAuctions, setFetchedAuctions] = useState([])

  useEffect(() => {
    async function fetchLastAuctions() {

      try {
        const response = await fetch('http://localhost:8080/fetchLastAuctions', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData)
          throw error
        }

        const resData = await response.json()
        setFetchedAuctions(resData.fetchedLastAuctions)


      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchLastAuctions()
  }, [])




  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full justify-start items-center">
        <p className="text-4xl text-orange-800 font-logo tracking-widest italic">Auctions in the Last 24 Hour</p>
      </div>

      <div className="flex flex-row gap-2">

      </div>

      <div className="flex flex-row border items-start p-3 w-full">
        <p>ItemCard</p>
        <p>ItemCard</p>
        <p>ItemCard</p>
        <p>ItemCard</p>
      </div>
    </div>
  )
}