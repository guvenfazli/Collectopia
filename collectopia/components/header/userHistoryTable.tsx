import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useState, useEffect } from "react"

type EventList = {
  message: string,
  interactionId: any
}

export default function UserHistoryTable() {

  const [eventList, setEventList] = useState<EventList[]>([])

  useEffect(() => {
    async function fetchMyEventHistory() {
      try {
        const response = await fetch('http://localhost:8080/fetchUserHistory', {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setEventList(resData.fetchedEventHistory)


      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchMyEventHistory()
  }, [])


  return (
    <div>
      <p>Test</p>
    </div>
  )
}