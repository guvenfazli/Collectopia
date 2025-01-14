"use client"
import { useState, useEffect } from "react"
import { io, Socket } from "socket.io-client"
import ImageShowcase from "./imageShowcase"
import ItemInformation from "./itemInformation"
export default function AddItem() {

  const [imageShowcase, setImageShowcase] = useState<string[]>([])
  const [socket, setSocket] = useState<Socket | undefined>()

  useEffect(() => {
    const socketConnection = io('http://localhost:8080/addItem')
    setSocket(socketConnection)
    socketConnection.on('itemAddedNotification', () => {
      console.log('Item added successfully!')
    })


    return () => {
      socketConnection.disconnect()
    }

  }, [])




  return (
    <div className="flex flex-col bg-blue-50 justify-start p-3 w-5/12 border text-blue-800 border-blue-900 rounded-lg shadow-md shadow-slate-800">
      <ImageShowcase imageShowcase={imageShowcase} />
      <ItemInformation setImageShowcase={setImageShowcase} socket={socket} />
    </div>
  )
}