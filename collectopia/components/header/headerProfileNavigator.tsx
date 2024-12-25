import Link from "next/link"

type ComponentType = {
  loggedName: string,
  loggedId: string
}


export default function HeaderProfileNavigator({ loggedName, loggedId }: ComponentType) {
  return (
    <nav className="flex flex-row justify-around items-center gap-5 text-lg">
      <p>Welcome back <span className="font-logo font-medium text-xl ml-1">{loggedName}</span></p>
      <Link href={`/profile/${loggedId}`}>Profile</Link>
      <Link href={'/inbox'}>Messages</Link>
      <Link href={'/logOut'}>Logout</Link>
    </nav>
  )
}