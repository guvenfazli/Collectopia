import { BaseSyntheticEvent, useState } from "react"
import { Socket } from "socket.io-client"
import { useToast } from "@/hooks/use-toast"

type ComponentProps = {
  auctionId: string;
  socket: Socket | undefined
}

export default function AuctionChatInputField({ auctionId, socket }: ComponentProps) {

  const { toast } = useToast()
  const [chatDelay, setChatDelay] = useState<boolean>(false)

  async function sendMessage(e: BaseSyntheticEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      setChatDelay(true)
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
      setChatDelay(false)
    } catch (err: any) {
      toast({
        title: 'Error!',
        description: err.message,
        className: "bg-red-500 border-none text-white text-xl"
      })
    }

  }

  return (
    <form method="POST" onSubmit={(e) => sendMessage(e)} className="flex w-full justify-between items-center">
      <input required name="message" placeholder="Type Your Message" className="placeholder:text-orange-300 p-3 bg-orange-100 border border-orange-800 w-4/5 text-orange-800 font-semibold outline-none" />
      <button disabled={chatDelay}
        className="h-full px-3 bg-orange-800 text-white font-logo duration-100 rounded-sm hover:bg-orange-300 hover:text-orange-800 disabled:bg-orange-100 disabled:pointer-events-none">
        Send Message
      </button>
    </form>
  )
}