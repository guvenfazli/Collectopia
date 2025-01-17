import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import ResponseForm from "./responseForm"

import { useEffect, useState } from "react";

type ComponentProps = {
  senderId: string;
  msgId: string
}

export default function ResponseMessage({ senderId, msgId }: ComponentProps) {


  const [isResponse, setIsResponse] = useState<boolean>(false)

  useEffect(() => {

    async function readMessage() {
      try {
        const response = await fetch(`http://localhost:8080/readMessage/${msgId}`, {
          method: "PATCH",
          credentials: "include"
        })

        if (response.ok) {
          const resData = await response.json()
          const error = resData.message
          throw error
        }

        const resData = await response.json()

      } catch (err: any) {
        return;
      }
    }

    readMessage()

  }, [])




  return (
    <Dialog open={isResponse} onOpenChange={() => setIsResponse(prev => !prev)} >

      <DialogTrigger className="w-full" asChild>
        <button className="p-1 bg-orange-800 duration-100 font-logo text-white px-3 rounded-sm hover:bg-orange-700">Response</button>
      </DialogTrigger>

      <DialogContent className="bg-orange-50 text-lg text-orange-800 flex flex-col border border-orange-800 w-1/3">
        <DialogHeader>
          <DialogTitle className="font-logo tracking-widest text-xl">Response</DialogTitle>
        </DialogHeader>
        <ResponseForm senderId={senderId} setIsResponse={setIsResponse} />
      </DialogContent>

    </Dialog>
  )
}