import Link from "next/link";
export default function Home() {



  return (
    <div>
      <p className="text-5xl font-general">Welcome.</p>
      <Link href={'/userAuth?mode=login'}>Auth Page</Link>
   
    </div>
  );
}
