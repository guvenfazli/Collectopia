import { FormEvent, useState } from "react"

import Interests from "../interests/interests"
import AuthInput from "../authInput"
import Link from "next/link"

type InterestsType = {
  value: string,
  display: string,
  isChosen: boolean
}
type InterestList = InterestsType[]

export default function UserRegister() {

  const [interestList, setInterestList] = useState<InterestList>([
    { value: 'anime', display: 'Anime', isChosen: false },
    { value: 'music', display: 'Music', isChosen: false },
    { value: 'videogame', display: 'Video Games', isChosen: false },
    { value: 'card', display: 'Cards', isChosen: false },
    { value: 'vintage', display: 'Vintage Toys', isChosen: false },
    { value: 'money', display: 'Old Moneys', isChosen: false },
    { value: 'lego', display: 'Legos', isChosen: false }
  ])
  const [chosenInterests, setChosenInterests] = useState<string[]>([])
  const [isError, setIsError] = useState<boolean | string>(false)
  const [isSuccess, setIsSuccess] = useState<boolean | string>(false)

  async function createAccount(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    formData.append('interests', JSON.stringify(chosenInterests))
    const data = Object.fromEntries(formData.entries()) // Adds the interests array to the form data.

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()
      setIsSuccess(resData.message)
    } catch (err: any) {
      setIsError(err.message)
    }

  }




  return (
    <div className="flex border border-gray-400 w-2/4 py-5 rounded-lg h-auto flex-col items-center justify-center text-center gap-5 max-lg:w-2/3 max-md:w-full">
      <div className="flex flex-col w-full gap-4">
        <p className="text-3xl font-semibold max-sm:text-xl">It's nice to meet you!</p>
        <p className="text-xl text-gray-700 max-sm:text-base">Sign up and get started!</p>
      </div>

      <form onSubmit={(e) => createAccount(e)} className="flex flex-col w-1/2 p-3 gap-5 max-lg:w-8/12 max-md:w-full">
        <AuthInput name={"name"} placeholder="Name" type="text" setIsError={setIsError} />
        <AuthInput name={"surname"} placeholder="Surname" type="text" setIsError={setIsError} />
        <AuthInput name={"email"} placeholder="Email" type="text" setIsError={setIsError} />
        <AuthInput name={"password"} placeholder="Password" type="password" setIsError={setIsError} />
        {isError && <p className="text-lg text-red-700">{isError}</p>}
        {isSuccess && <p className="text-lg text-green-700">{isSuccess}</p>}
        <Interests interestList={interestList} setInterestList={setInterestList} setChosenInterests={setChosenInterests} />
        <div className="flex w-full justify-center py-1">
          <button className="py-2 w-10/12 bg-slate-950 text-white duration-150 hover:bg-slate-500 active:bg-black">Sign Up</button>
        </div>
      </form>


      <div className="flex flex-row justify-center px-3 w-1/2">
        <p>Have an account? <Link href={'/userAuth?mode=login'} className="font-semibold text-orange-600">Login</Link></p>
      </div>
    </div>
  )
}