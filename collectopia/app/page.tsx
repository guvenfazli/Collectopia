import Link from "next/link";
import LastAuctions from "@/components/homepage/lastAuctions/lastAuctions";
import AuctionList from "@/components/homepage/auctionList/auctionList";
export default function Home() {
  return (
    <div className="flex flex-col justify-start items-center w-full">
      <div className="flex flex-col gap-3 p-3 w-9/12 bg-white">
        <LastAuctions />
        <AuctionList />
      </div>
      <Link href={'/profile/676cd2e40bddea53d1a9ca03'}>Test</Link>
    </div>
  );
}
