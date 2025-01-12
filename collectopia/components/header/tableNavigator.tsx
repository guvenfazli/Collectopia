import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

type EventList = {
  message: string,
  interactionId: any
}

type ComponentProps = {
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  eventList: EventList[]
}


export default function TableNavigator({ currentPage, setCurrentPage, eventList }: ComponentProps) {

  return (
    <div className="flex w-full justify-between">
      <button disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev -= 5)} className="p-1 bg-orange-800 text-white rounded-full duration-100 hover:bg-orange-700 disabled:bg-orange-200">
        <IoIosArrowBack />
      </button>

      <button disabled={eventList.length === 0} onClick={() => setCurrentPage(prev => prev += 5)} className="p-1 bg-orange-800 text-white rounded-full duration-100 hover:bg-orange-700 disabled:bg-orange-200">
        <IoIosArrowForward />
      </button>
    </div>
  )
}