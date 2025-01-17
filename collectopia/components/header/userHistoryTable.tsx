import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import TableNavigator from "./tableNavigator"
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
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    async function fetchMyEventHistory() {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/fetchUserHistory?page=${currentPage}`, {
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
        setIsLoading(false)
      }
    }

    fetchMyEventHistory()
  }, [currentPage])

  return (
    <>
      {isLoading ? <span id="headerLoader" className="self-center"></span> :
        <Table>
          <TableCaption>
            <TableNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} fetchedList={eventList} addPage={5} />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead className="text-right">Auction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventList.length === 0 &&
              <TableRow className="text-left">
                <TableCell>
                  No activities found.
                </TableCell>
              </TableRow>
            }
            {eventList.map((event: any, i: number) =>
              event.interactionId ?
                <TableRow key={event._id} >
                  <TableCell className="font-medium">
                    <Link href={`/auctions/${event.interactionId._id}`}>{event.event}</Link>
                  </TableCell>
                  <TableCell>
                    {dayjs(event.createdAt).format("DD/MM/YY")}
                  </TableCell>
                  <TableCell className="text-right">
                    {event.interactionId._id}
                  </TableCell>
                </TableRow>

                :

                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <p>Event deleted</p>
                  </TableCell>
                </TableRow>
            )}

          </TableBody>
        </Table >
      }
    </>
  )
}