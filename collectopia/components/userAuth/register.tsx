import { useState } from "react"

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
  const [chosenInterests, setChosenInterests] = useState<InterestList>([])

  return (
    <div className="flex border border-gray-400 w-2/4 py-5 rounded-lg h-auto flex-col items-center justify-center text-center gap-5">
      <div className="flex flex-col w-full gap-4">
        <p className="text-3xl font-semibold">It's nice to meet you!</p>
        <p className="text-xl text-gray-700">Sign up and get started!</p>
      </div>

      <form className="flex flex-col w-1/2 p-3 gap-5">
        <AuthInput name="name" placeholder="Name" />
        <AuthInput name="surname" placeholder="Surname" />
        <AuthInput name="email" placeholder="Email" />
        <AuthInput name="password" placeholder="Password" />
        <Interests interestList={interestList} setInterestList={setInterestList} setChosenInterests={setChosenInterests} chosenInterests={chosenInterests} />
        <div className="flex w-full justify-center py-1">
          <button className="py-2 w-10/12 bg-slate-950 text-white duration-150 hover:bg-slate-500 active:bg-black">Sign In</button>
        </div>
      </form>

      <div className="flex flex-row justify-between px-3 w-1/2">
        <p>Have an account? <Link href={'/userAuth?mode=login'} className="font-semibold text-orange-600">Login</Link></p>
      </div>
    </div>
  )
}