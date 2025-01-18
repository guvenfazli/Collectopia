"use client"
import { useEffect, useState } from "react"
import OffersList from "./offersList"
import OfferDetails from "./offerDetails/offerDetails"
import TableNavigator from "../header/tableNavigator"


export default function OffersMain() {

  const [renderOffers, setRenderOffers] = useState<string>("receivedOffers")
  const [offersList, setOffersList] = useState({
    receivedOffers: [],
    sentOffers: [],
  })
  const [chosenOffer, setChosenOffer] = useState<undefined | any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    async function fetchOfferList() {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:8080/fetchOfferList?page=${currentPage}`, {
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
        setIsLoading(false)
      } catch (err: any) {
        setIsLoading(false)
      }
    }

    fetchOfferList()
  }, [currentPage])

  return (
    <div className="flex p-3 flex-col justify-start items-start w-10/12 bg-white relative">

      <div className="flex w-full">
        <TableNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} addPage={3} fetchedList={offersList[renderOffers]} />
      </div>

      <div className="flex w-full">
        {isLoading ?
          <div className="flex w-full justify-center items-center">
            <span id="headerLoader" className="self-center"></span>
          </div>
          :
          <>
            <OffersList renderOffers={renderOffers} offersList={offersList} setRenderOffers={setRenderOffers} setChosenOffer={setChosenOffer} />
            <OfferDetails chosenOffer={chosenOffer} renderOffers={renderOffers} />
          </>
        }
      </div>
    </div>
  )
}