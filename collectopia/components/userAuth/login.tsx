import Link from "next/link"
import AuthInput from "../authInput"
export default function UserLogin() {


  return (

    <div className="flex border border-gray-400 w-2/4 rounded-lg h-2/4 flex-col items-center justify-center text-center gap-5">
      <div className="flex flex-col w-full gap-4">
        <p className="text-3xl font-semibold">It's great to have you back!</p>
        <p className="text-xl text-gray-700">Sign in and see the auctions!</p>
      </div>

      <form className="flex flex-col w-1/2 p-3 gap-5">
        <AuthInput name="email" placeholder="Email" />
        <AuthInput name="password" placeholder="Password" />
        <div className="flex w-full justify-center py-1">
          <button className="py-2 w-10/12 bg-slate-950 text-white duration-150 hover:bg-slate-500 active:bg-black">Sign In</button>
        </div>
      </form>

      <div className="flex flex-row justify-between px-3 w-1/2">
        <p>New user? <Link href={'/userAuth?mode=register'} className="font-semibold text-orange-600">Register</Link></p>
        <p className="text-orange-600 hover:underline hover:cursor-pointer">Forgot Password?</p>
      </div>
    </div>
  )
}