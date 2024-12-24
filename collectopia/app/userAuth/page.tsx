"use client"
import UserLogin from "@/components/userAuth/login"
import UserRegister from "@/components/userAuth/register"
import { useSearchParams } from "next/navigation"
export default function UserAuthPage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  console.log(mode)



  if (mode === 'login') {
    return (
      <div className="flex justify-center h-screen items-center border border-black">
        <UserLogin />
      </div>
    )
  } else if (mode === 'register') {
    return (
      <div className="flex justify-center h-screen items-center border border-black">
        <UserRegister />
      </div>
    )
  }



}