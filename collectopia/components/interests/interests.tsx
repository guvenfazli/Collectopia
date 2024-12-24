type InterestsType = {
  value: string,
  display: string,
  isChosen: boolean
}

type InterestList = InterestsType[]

type ComponentTypes = {
  interestList: InterestList,
  setInterestList: React.Dispatch<React.SetStateAction<InterestsType[]>>
}



export default function Interests({ interestList, setInterestList }: ComponentTypes) {

  return (
    <div className="flex flex-col w-full justify-start items-start gap-1">
      <div className="flex text-lg font-semibold text-center justify-center w-full">
        <p>Which auctions would you like to see more?</p>
      </div>

      <div className="flex flex-row justify-around w-full items-start">

      </div>

    </div>
  )
}