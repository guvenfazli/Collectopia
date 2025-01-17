import { BaseSyntheticEvent } from "react"
import { useToast } from "@/hooks/use-toast"


type ComponentProps = {
  senderId: string;
  setIsResponse: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ResponseForm({ senderId, setIsResponse }: ComponentProps) {

  const { toast } = useToast()

  async function sendMessage(e: BaseSyntheticEvent, senderId: string) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const response = await fetch(`http://localhost:8080/sendMessageToUsersInbox/${senderId}`, {
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

      toast({
        title: 'Success!',
        description: resData.message,
        className: "bg-green-500 border-none text-white text-xl"
      })

    } catch (err: any) {
      toast({
        title: 'Error!',
        description: err.message,
        className: "bg-red-500 border-none text-white text-xl"
      })
    }
  }

  return (
    <form onSubmit={(e) => sendMessage(e, senderId)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input required name="title" placeholder="Title" className="p-2 outline-none bg-orange-200 placeholder:text-orange-400" />
      </div>


      <div className="flex flex-col gap-1">
        <label htmlFor="message">Message</label>
        <textarea required name="message" placeholder="Your Message..." className="p-2 outline-none bg-orange-200 placeholder:text-orange-400" />
      </div>

      <button onClick={() => setIsResponse(prev => !prev)} className="bg-orange-800 duration-100 py-1 font-logo text-white hover:bg-orange-600">Send</button>
    </form>
  )
}