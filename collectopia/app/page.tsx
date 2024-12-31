import Link from "next/link";
import LastAuctions from "@/components/homepage/lastAuctions/lastAuctions";
export default function Home() {
  return (
    <div className="flex flex-col justify-start items-center w-full">
      
      <div className="flex flex-col p-3 w-9/12 bg-white">
        <LastAuctions />
      </div>


      <p className="text-5xl font-general">Welcome.</p>
      <Link href={'/userAuth?mode=login'}>Auth Page</Link>
      <Link href={'/profile/676cd2e40bddea53d1a9ca03'}>Test</Link>
    </div>
  );
}
