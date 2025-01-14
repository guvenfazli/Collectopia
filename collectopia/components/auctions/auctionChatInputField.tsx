import { BaseSyntheticEvent, useState } from "react"
import { Socket } from "socket.io-client"

type ComponentProps = {
  auctionId: string;
  socket: Socket | undefined
}

export default function AuctionChatInputField({ auctionId, socket }: ComponentProps) {





  async function sendMessage(e: BaseSyntheticEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {

      const response = await fetch(`http://localhost:8080/sendMessage/${auctionId}`, {
        method: "POST",
        credentials: "include",
        body: formData
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()
      socket?.emit("sendMessage")

    } catch (err: any) {
      console.log(err.message)
    }

  }

  return (
    <form method="POST" onSubmit={(e) => sendMessage(e)} className="flex w-full justify-between items-center">
      <input required name="message" placeholder="Type Your Message" className="placeholder:text-orange-300 p-3 bg-orange-100 border border-orange-800 w-4/5 text-orange-800 font-semibold outline-none" />
      <button className="h-full px-3 bg-orange-800 text-white font-logo duration-100 rounded-sm hover:bg-orange-300 hover:text-orange-800">Send Message</button>
    </form>
  )
}