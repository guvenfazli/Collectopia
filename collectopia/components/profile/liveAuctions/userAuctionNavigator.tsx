type ComponentProps = {
  auctionLength: number;
  userId: string | string[] | undefined;
  loggedUserId: string;
  listingNavNumber: number;
  setListingNavigator: React.Dispatch<React.SetStateAction<number>>;
  isListing: boolean
}


export default function UserAuctionNavigator({ auctionLength, userId, loggedUserId, listingNavNumber, setListingNavigator, isListing }: ComponentProps) {

  return (
    <>
      {(auctionLength === 0 && userId === loggedUserId) ? <p>You have no listing!</p> : (auctionLength === 0 && userId !== loggedUserId) ? <p>This user has no listing</p> : auctionLength > 0 &&
        <div className="flex flex-row w-full justify-between items-center mb-4">
          <button disabled={listingNavNumber === 0 || !isListing} onClick={() => setListingNavigator(prev => prev -= 1)} className="py-1 px-2 duration-150 bg-blue-600 text-white shadow-md rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-blue-300 active:scale-95">Previous</button>
          <button disabled={listingNavNumber >= (auctionLength / 2) - 1 || !isListing} onClick={() => setListingNavigator(prev => prev += 1)} className="py-1 px-2 duration-150 bg-blue-600 text-white shadow-md rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-blue-300 active:scale-95">Next</button>
        </div>
      }
    </>
  )
}