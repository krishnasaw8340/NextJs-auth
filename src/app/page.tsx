import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-purple-600 text-white p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Authentication Project!</h1>
        <p className="text-lg mb-8">
          I created this application to learn and implement authentication using Next.js and Mailtrap.io.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/signup">
            <button className="bg-orange-500 hover:bg-orange-600 py-3 px-6 rounded-lg text-lg font-medium transition duration-300 ease-in-out">
              Create an Account
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-yellow-500 hover:bg-yellow-600 py-3 px-6 rounded-lg text-lg font-medium transition duration-300 ease-in-out">
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
