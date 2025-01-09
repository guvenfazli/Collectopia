"use client"
import { useEffect, useState } from "react"
import OffersList from "./offersList"
export default function OffersMain() {
  return (
    <div className="flex p-3 flex-col justify-start items-start w-10/12 bg-white">
      <OffersList />
    </div>
  )
}