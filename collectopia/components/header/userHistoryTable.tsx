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
import Link from "next/link"
import dayjs from "dayjs"

type EventList = {
  message: string,
  interactionId: any
}

export default function UserHistoryTable() {

  const [eventList, setEventList] = useState<EventList[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchMyEventHistory() {
      setIsLoading(true)
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
        setIsLoading(false)
      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchMyEventHistory()
  }, [])


  if (isLoading) {
    <span id="headerLoader" className="self-center"></span>
  }


  return (
    <>
      {isLoading ? <span id="headerLoader" className="self-center"></span> : eventList.length === 0 ? <p>No Activity found</p> :
        <Table>
          <TableCaption>My History</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead className="text-right">Auction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventList.map((event: any) =>
              <TableRow key={event._id}>
                <TableCell className="font-medium">
                  <Link href={`/auctions/${event.interactionId._id}`}>{event.event}</Link>
                </TableCell>
                <TableCell>
                  {dayjs(event.createdAt).format("DD/MM/YY")}
                </TableCell>
                <TableCell className="text-right">
                  {event.interactionId._id}
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      }
    </>
  )
}