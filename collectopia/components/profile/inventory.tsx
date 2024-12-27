import InventoryItemCard from "./inventoryItemCard"



export default function UsersInventory() {
  return (
    <div className="flex flex-col w-full items-start justify-start gap-5">
      <div className="flex flex-row items-center justify-start">
        <p className="text-orange-600 text-3xl font-logo tracking-wide">Inventory</p>
      </div>

      <div className="flex flex-row items-center justify-start">
        <InventoryItemCard />
      </div>
    </div>
  )
}