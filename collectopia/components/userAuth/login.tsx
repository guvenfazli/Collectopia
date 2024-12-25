import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthInput from "../authInput"


export default function UserLogin() {

  const [isError, setIsError] = useState<boolean | string>(false)
  const [isSucces, setIsSuccess] = useState<boolean | string>(false)
  const router = useRouter()

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    try {

      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()
      setIsSuccess(resData.message)
      router.push('/')
    } catch (err: any) {
      setIsError(err.message)
    }

  }

  return (

    <div className="flex border border-gray-400 w-2/4 rounded-lg h-2/4 flex-col items-center justify-center text-center gap-5">
      <div className="flex flex-col w-full gap-4">
        <p className="text-3xl font-semibold">It's great to have you back!</p>
        <p className="text-xl text-gray-700">Sign in and see the auctions!</p>
      </div>

      <form onSubmit={(e) => login(e)} className="flex flex-col w-1/2 p-3 gap-5">
        <AuthInput name="email" placeholder="Email" type="text" setIsError={setIsError} />
        <AuthInput name="password" placeholder="Password" type="password" setIsError={setIsError} />
        {isError && <p className="text-lg text-red-700">{isError}</p>}
        {isSucces && <p className="text-lg text-green-700">{isSucces}</p>}
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