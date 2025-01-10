"use client"
import { useEffect, useState } from "react"
import OffersList from "./offersList"
export default function OffersMain() {

  const [renderOffers, setRenderOffers] = useState<string>("receivedOffers")
  const [offersList, setOffersList] = useState({
    receivedOffers: [],
    sentOffers: []
  })

  useEffect(() => {
    async function fetchOfferList() {
      try {

        const response = await fetch('http://localhost:8080/fetchOfferList', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setOffersList({
          receivedOffers: resData.receivedOffers,
          sentOffers: resData.sentOffers
        })

        console.log(resData)



      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchOfferList()
  }, [])



  return (
    <div className="flex p-3 flex-col justify-start items-start w-10/12 bg-white">
      <OffersList renderOffers={renderOffers} offersList={offersList} setRenderOffers={setRenderOffers} />
    </div>
  )
}