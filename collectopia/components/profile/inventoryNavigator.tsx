type ComponentProps = {
  inventoryLength: number;
  userId: string | string[] | undefined;
  loggedUserId: string;
  inventoryNavNumber: number;
  setInventoryNavigator: React.Dispatch<React.SetStateAction<number>>;
  isInventory: boolean
}

export default function InventoryNavigator({ inventoryLength, userId, loggedUserId, inventoryNavNumber, setInventoryNavigator, isInventory }: ComponentProps) {
  return (
    <>
      {(inventoryLength === 0 && userId === loggedUserId) ? <p>You have no items!</p> : userId !== loggedUserId ? <p>This user has no items</p> : inventoryLength > 0 &&
        <div className="flex flex-row w-full justify-between items-center mb-4">
          <button disabled={inventoryNavNumber === 0 || !isInventory} onClick={() => setInventoryNavigator(prev => prev -= 1)} className="py-1 px-2 duration-150 bg-orange-600 text-white shadow-md rounded-lg hover:bg-orange-700 hover:shadow-lg disabled:bg-orange-300 active:scale-95">Previous</button>
          <button disabled={inventoryNavNumber >= (inventoryLength / 2) - 1 || !isInventory} onClick={() => setInventoryNavigator(prev => prev += 1)} className="py-1 px-2 duration-150 bg-orange-600 text-white shadow-md rounded-lg hover:bg-orange-700 hover:shadow-lg disabled:bg-orange-300 active:scale-95">Next</button>
        </div>
      }
    </>
  )
}