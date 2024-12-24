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
    <button onClick={() => chooseInterest(interest)} type="button" value={interest.value}>{interest.display}</button>
  )
}