import { BaseSyntheticEvent } from "react"

type ComponentProps = {
  senderId: string
}

export default function ResponseForm({ senderId }: ComponentProps) {

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
      console.log(resData.message)
    } catch (err: any) {
      console.log(err)
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

      <button className="bg-orange-800 duration-100 py-1 font-logo text-white hover:bg-orange-600">Send</button>
    </form>
  )
}