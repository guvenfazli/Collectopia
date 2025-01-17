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
import TableNavigator from "./tableNavigator"

type ComponentProps = {
  setIsNotificationDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NotificationList({ setIsNotificationDialog }: ComponentProps) {

  const [notificationList, setNotificationList] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    async function fetchNotifications() {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/notifications?page=${currentPage}`, {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setNotificationList(resData.fetchedNotifications)
        setIsLoading(false)
      } catch (err: any) {
        return;
      }
    }

    fetchNotifications()
  }, [currentPage])



  return (
    <>
      {isLoading ? <span id="headerLoader" className="self-center"></span> :
        <Table>
          <TableCaption>
            <TableNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} fetchedList={notificationList} addPage={5} />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Notification</TableHead>
              <TableHead className="text-right">Event Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notificationList.length === 0 &&
              <TableRow className="text-left">
                <TableCell>
                  No activities found.
                </TableCell>
              </TableRow>
            }
            {notificationList.map((notification: any) =>
              <TableRow key={notification._id}>
                <TableCell className="font-medium">
                  <Link
                    href={`${notification.notificationType}/${notification.notificationType === "/auctions" ? notification.followedAuctionId[0] : notification.followedUserId[0]}`} onClick={() => setIsNotificationDialog(prev => !prev)}>
                    {notification.message}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  {dayjs(notification.createdAt).format("DD/MM/YY")}
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      }
    </>
  )
}