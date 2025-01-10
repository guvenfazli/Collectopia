"use client"
import { useEffect, useState } from "react"
import OffersList from "./offersList"
import OfferDetails from "./offerDetails/offerDetails"


export default function OffersMain() {

  const [renderOffers, setRenderOffers] = useState<string>("receivedOffers")
  const [offersList, setOffersList] = useState({
    receivedOffers: [],
    sentOffers: []
  })
  const [chosenOffer, setChosenOffer] = useState<any>([])

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

      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchOfferList()
  }, [])



  return (
    <div className="flex p-3 flex-row justify-start items-start w-10/12 bg-white">
      <OffersList renderOffers={renderOffers} offersList={offersList} setRenderOffers={setRenderOffers} />
      <OfferDetails />
    </div>
  )
}