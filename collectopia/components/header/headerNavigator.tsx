import Link from "next/link";

export default function HeaderNavigator() {
  return (
    <nav className="flex flex-row justify-around items-center gap-5 text-lg">
      <Link className="duration-75 border border-red-900 p-2 py-0 bg-white rounded-full" href={'/'}>H</Link>
      <Link className="duration-75 border border-red-900 p-2 py-0 bg-white rounded-full" href={'/addItem'}>A</Link>
      <Link className="duration-75 border border-red-900 p-2 py-0 bg-white rounded-full" href={'/myTrackings'}>T</Link>
      <Link className="duration-75 border border-red-900 p-2 py-0 bg-white rounded-full" href={'/myAuctions'}>M</Link>
    </nav>
  )
}