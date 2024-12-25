type InterestsType = {
  value: string,
  display: string,
  isChosen: boolean
}

type ComponentTypes = {
  interest: InterestsType,
  setInterestList: React.Dispatch<React.SetStateAction<InterestsType[]>>,
  setChosenInterests: React.Dispatch<React.SetStateAction<string[]>>,
}

export default function InterestButton({ interest, setInterestList, setChosenInterests }: ComponentTypes) {

  function chooseInterest(interest: InterestsType) {
    setChosenInterests((prev: string[]) => { // Adds the interest that chosen, if its already chosen, removes it.
      const updatedList = [...prev]

      const isAlreadyChosen = updatedList.some((sameInterest) => sameInterest === interest.value)

      if (isAlreadyChosen) {
        const indexOfChosenInterest = updatedList.findIndex((sameInterest) => sameInterest === interest.value)
        updatedList.splice(indexOfChosenInterest, 1)
        return updatedList;
      }

      updatedList.push(interest.value)
      return updatedList;
    })

    setInterestList((prev: InterestsType[]) => { // Marks it as chosen, or unchosen.
      const updatedList = [...prev]

      const chosenInterest = updatedList.findIndex((intrst) => intrst === interest)

      updatedList[chosenInterest].isChosen = !updatedList[chosenInterest].isChosen
      return updatedList
    })
  }


  return (
    <button onClick={() => chooseInterest(interest)} type="button" className={
      `px-4 py-2 text-white ease-in-out font-medium rounded-lg shadow-md transition-all duration-700 focus:outline-none focus:ring-2 focus:ring-opacity-50 
      ${interest.isChosen
        ? "bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 hover:shadow-xl focus:ring-green-600"
        : "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-red-500 hover:shadow-lg focus:ring-orange-600"
      } max-sm:px-2 max-sm:py-1`}>{interest.display}</button>
  )
}