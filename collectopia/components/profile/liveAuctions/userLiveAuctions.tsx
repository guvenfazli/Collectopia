"use client"

export default function UserLiveAuctions({ userAuctions }) {


  return (
    <div className="flex flex-col w-full items-start justify-start gap-5">

      <div className="flex flex-col w-full items-center justify-start">
        <p className="text-orange-600 text-3xl font-logo tracking-wide">Active Listings <span className="text-base">({userAuctions.length})</span></p>

      </div>

      <div className="flex flex-row w-full  relative overflow-hidden">

      </div>
    </div>
  )
}