import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

type ComponentProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchedList: any[];
  addPage: number;
  isError?: boolean | string
}


export default function TableNavigator({ currentPage, setCurrentPage, fetchedList, addPage, isError }: ComponentProps) {

  return (
    <div className="flex w-full justify-between">
      <button disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev -= addPage)} className="p-1 bg-orange-800 text-white rounded-full duration-100 hover:bg-orange-700 disabled:bg-orange-200 shadow-md hover:shadow-lg transition-transform">
        <IoIosArrowBack />
      </button>

      <button disabled={fetchedList.length === 0 || isError !== false} onClick={() => setCurrentPage(prev => prev += addPage)} className="p-1 bg-orange-800 text-white rounded-full duration-100 hover:bg-orange-700 disabled:bg-orange-200 shadow-md hover:shadow-lg transition-transform">
        <IoIosArrowForward />
      </button>
    </div>
  )
}