type InterestsType = {
  value: string,
  display: string,
  isChosen: boolean
}

type InterestList = InterestsType[]

type ComponentTypes = {
  interestList: InterestList,
  setInterestList: React.Dispatch<React.SetStateAction<InterestsType[]>>,
  setChosenInterests: React.Dispatch<React.SetStateAction<string[]>>,
}

import InterestButton from "./interestButton"

export default function Interests({ interestList, setInterestList, setChosenInterests }: ComponentTypes) {

  return (
    <div className="flex flex-col w-full justify-start items-start gap-4 max-md:w-full">
      <div className="flex text-lg font-semibold text-center justify-center w-full">
        <p>Which auctions would you like to see more?</p>
      </div>

      <div className="flex flex-row justify-around w-full flex-wrap gap-y-3 items-start">
        {interestList.map((interest) =>
          <InterestButton key={interest.value} interest={interest} setInterestList={setInterestList} setChosenInterests={setChosenInterests} />)
        }
      </div>

    </div>
  )
}