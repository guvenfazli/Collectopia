import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { authActions } from "@/store/reduxStore"
type ComponentType = {
  loggedName: string,
  loggedId: string
}


export default function HeaderProfileNavigator({ loggedName, loggedId }: ComponentType) {

  const router = useRouter()
  const dispatch = useDispatch()


  async function logOut() {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        credentials: "include"
      })
      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }
      router.push('/userAuth?mode=login')
      const resData = await response.json()
      const deleteAuth = setTimeout(() => {
        dispatch(authActions.logOutUser({ isLogged: false, userInfo: undefined }))
      }, 100)
    } catch (err: any) {
      console.log(err.message)
    }
  }




  return (
    <nav className="flex flex-row justify-around items-center gap-5 text-lg">
      <p>Welcome back <span className="font-logo font-medium text-xl ml-1">{loggedName && loggedName}</span></p>
      <Link href={`/profile/${loggedId && loggedId}`}>Profile</Link>
      <Link href={'/inbox'}>Messages</Link>
      <button onClick={logOut}>Logout</button>
    </nav>
  )
}