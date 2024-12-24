type InterestsType = {
  value: string,
  display: string,
  isChosen: boolean
}
export default function InterestButton({ interest, interestList, setInterestList, setChosenInterests }) {

  function chooseInterest(interest: InterestsType) {
    setChosenInterests((prev: string[]) => {
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

    setInterestList((prev: InterestsType[]) => {
      const updatedList = [...prev]

      const chosenInterest = updatedList.findIndex((intrst) => intrst === interest)

      updatedList[chosenInterest].isChosen = !updatedList[chosenInterest].isChosen
      return updatedList
    })
  }


  return (
    <button onClick={() => chooseInterest(interest)} type="button" className={`border duration-150 rounded-lg text-nowrap py-1 px-4 bg-orange-600 text-white font-semibold hover:bg-orange-900 ${interest.isChosen && "bg-orange-300"}`}>{interest.display}</button>
  )
}