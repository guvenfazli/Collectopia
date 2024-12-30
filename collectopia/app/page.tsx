import Link from "next/link";
export default function Home() {
  return (
    <div>
      <p className="text-5xl font-general">Welcome.</p>
      <Link href={'/userAuth?mode=login'}>Auth Page</Link>
      <Link href={'/profile/676cd2e40bddea53d1a9ca03'}>Test</Link>
    </div>
  );
}
