"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useDispatch } from "react-redux"
import { inboxActions } from "@/store/reduxStore"
import TableNavigator from "../header/tableNavigator"
import RecievedMessage from "./recievedMessage"
import ResponseMessage from "./responseMessage"

type Message = {
  createdAt: string;
  isRead: boolean;
  message: string;
  receiver: string;
  sender: {
    _id: string;
    name: string;
    surname: string;
  }
  title: string;
  _id: string;
  updatedAt: string;
}

type fetchedInbox = Message[];



export default function UserInbox() {

  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [inbox, setInbox] = useState<fetchedInbox>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean | string>(false)


  useEffect(() => {
    async function fetchInbox() {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/inbox?page=${currentPage}`, {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()

        dispatch(inboxActions.getCount({ messageCount: resData.nonReadCount }))
        setInbox(resData.fetchedInbox)
        setIsError(false)
        setIsLoading(false)
      } catch (err: any) {
        setIsError(err.message)
        setIsLoading(false)
      }
    }

    fetchInbox()
  }, [currentPage])

  function readMsg(msgIndex: number) {
    dispatch(inboxActions.controlCount())
    setInbox((prev) => {
      const updatedInbox = [...prev]
      updatedInbox[msgIndex].isRead = true
      return updatedInbox
    })
  }



  if (mode === "recieved") {
    return (
      <div className="flex p-3 flex-col relative justify-start gap-3 items-start w-10/12 bg-white">
        {isLoading && <span id="headerLoader" className="self-center"></span>}
        {isError ? <p className="self-center text-lg text-orange-800 tracking-wider">{isError}</p> :

          inbox.map((msg: any, i: number) =>
            <Dialog key={msg._id}>

              <DialogTrigger onClick={() => readMsg(i)} className="w-full">
                <RecievedMessage message={msg} />
              </DialogTrigger>

              <DialogContent className="bg-orange-50 text-lg text-orange-800 flex flex-col border border-orange-800 w-1/3">
                <DialogHeader>
                  <DialogTitle className="font-logo tracking-widest text-xl">{msg.title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 w-full justify-start items-start">
                  <p>{msg.message}</p>
                  <ResponseMessage senderId={msg.sender._id} msgId={msg._id} />
                </div>
              </DialogContent>

            </Dialog>
          )}

        <div className="flex w-full justify-between">
          <TableNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} addPage={10} isError={isError} fetchedList={inbox} />
        </div>
      </div>
    )
  }
}