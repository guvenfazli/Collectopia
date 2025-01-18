import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

type ComponentProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number,
  isError: boolean | string
}

export default function AuctionPaginationNavigator({ setPage, page, isError }: ComponentProps) {

  function navigatePage(operator: string) {
    if (operator === "forward") {
      setPage(prev => prev += 1)
    } else {
      setPage(prev => prev -= 1)
    }
  }

  return (
    <div className="flex flex-row justify-between items-center">
      <button disabled={page === 0} onClick={() => navigatePage("backward")} className="p-1 bg-orange-300 text-orange-800 rounded-3xl hover:bg-orange-800 hover:text-orange-400 duration-100 disabled:bg-orange-100 disabled:text-orange-400 border-orange-800 border">
        <IoIosArrowBack />
      </button>
      <button disabled={isError !== false} onClick={() => navigatePage("forward")} className="p-1 bg-orange-300 text-orange-800 rounded-3xl hover:bg-orange-800 hover:text-orange-400 duration-100 disabled:bg-orange-100 disabled:text-orange-400 border border-orange-800">
        <IoIosArrowForward />
      </button>
    </div>
  )
}