import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { MdDelete, MdModeEditOutline } from "react-icons/md";

import { useState } from "react"
import { useSelector } from "react-redux";
import CardInformation from "./cardInformation"
import ItemEditForm from "./itemEditForm";
import Image from "next/image"
import dayjs from "dayjs"

type FetchedItem = {
  _id: string,
  title: string,
  minValue: number,
  buyout: number,
  category: string,
  subCategory: string,
  imageList: string[],
  tagList: string[]
  createdAt: string,
  owner: string,
  isListed: boolean
}

type ComponentsProp = {
  fetchedItem: FetchedItem;
  isInventory: boolean;
}


export default function InventoryItemCard({ fetchedItem, isInventory }: ComponentsProp) {

  const loggedUser = useSelector((state: { auth: { userInfo: { userInfo: any } } }) => state.auth.userInfo.userInfo)

  const createdDate = new Date(fetchedItem.createdAt)
  const dateDataConverted = dayjs(createdDate) // Formats the date

  async function deleteItem() {
    try {
      const response = await fetch(`http://localhost:8080/deleteMyItem/${fetchedItem._id}`, {
        method: 'DELETE',
        credentials: "include"
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData)
        throw error
      }

      const resData = await response.json()
      // Will add toast notification

    } catch (err: any) {
      console.log(err.message)
    }
  }


  return (
    <div className={`flex bg-orange-200 text-nowrap overflow-hidden duration-1000 ease-in-out flex-shrink-0 border border-orange-300 h-full flex-col items-start justify-start shadow-slate-800 shadow-xl rounded-lg ${!isInventory ? '-mr-20 w-full' : 'mr-0 w-1/4'}`}>
      {loggedUser.id === fetchedItem.owner &&
        <div className="flex flex-row justify-end w-full items-center gap-2 p-1 border">
          <button onClick={deleteItem} className="bg-orange-800 text-white rounded-xl p-1 hover:bg-orange-500 duration-200 shadow-lg shadow-slate-200">
            <MdDelete />
          </button>

          <Dialog>
            <DialogTrigger className={`bg-orange-800 text-white rounded-xl p-1 hover:bg-orange-500 duration-200 shadow-lg shadow-slate-200 ${fetchedItem.isListed && "hidden"}`}>
              <MdModeEditOutline />
            </DialogTrigger>

            <DialogContent className="bg-orange-50 text-lg w-1/6 text-orange-800 flex flex-col border border-orange-800">
              <DialogHeader>
                <DialogTitle className="font-logo tracking-widest text-xl">Edit Item</DialogTitle>
              </DialogHeader>
              <ItemEditForm fetchedItem={fetchedItem} />
            </DialogContent>
          </Dialog>
        </div>
      }

      <div className="flex w-full items-start mb-4 min-h-44 overflow-hidden relative">
        <Carousel className="w-full">
          <CarouselContent className="h-44">
            {fetchedItem.imageList.map((img) =>
              <CarouselItem className="relative" key={img}>
                <div className="absolute blur-sm top-0 right-0 bottom-0 left-0" style={{ background: `url(http://localhost:8080/${img.replaceAll(/\\/g, "/")})`, backgroundPosition: "center", backgroundSize: "contain" }} />
                <Image
                  fill
                  alt="uploadedImage"
                  src={`http://localhost:8080/${img.replaceAll(/\\/g, "/")}`}
                  style={{ objectFit: "contain" }} />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>


      <div className="flex flex-col w-full p-1 gap-3 justify-start items-start">
        <CardInformation fetchedItemInfo={fetchedItem.title} title="Title" />
        <CardInformation fetchedItemInfo={fetchedItem.minValue + ' $'} title="Minimum Auction Value" />
        <CardInformation fetchedItemInfo={fetchedItem.buyout + ' $'} title="Buyout Value" />
        <CardInformation tagList={fetchedItem.tagList} title="Tags" />
        <CardInformation fetchedItemInfo={dateDataConverted.format("DD/MM/YYYY")} title="Created At" />
      </div>
    </div>
  )
}