import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import Link from "next/link";

export default function HeaderNavigator() {
  return (
    <nav className="flex flex-row justify-around items-center gap-5 text-lg">
      <Link className="duration-75 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/'}><FaHome /></Link>
      <Link className="duration-75 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/addItem'}><IoMdAddCircle /></Link>
      <Link className="duration-75 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/myTrackings'}><GiPayMoney /></Link>
      <Link className="duration-75 border border-red-900 p-2 py-2 bg-white rounded-full hover:bg-orange-300" href={'/myAuctions'}><GiReceiveMoney /></Link>
    </nav>
  )
}