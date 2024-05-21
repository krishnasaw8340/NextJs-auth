import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Authentication Project Using mailtrap.io</h1>
      <div className="m-5 ">
        Want to create account?
        <Link href="/signup" className="font-medium bg-orange-600 py-1 px-1 text-white rounded-lg pl-4 m-5">Create</Link>
        {/* <hr/> */}
        
        <Link href="/login" className="font-medium bg-yellow-600 px-1 py-1 text-white rounded-md m5 pl-3">Login</Link>
      </div>
    </main>
  );
}
