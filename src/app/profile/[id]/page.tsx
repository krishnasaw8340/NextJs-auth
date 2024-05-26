import Link from "next/link";
export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            <hr className="w-16 border-t-2 mb-4 border-gray-400" />
            <p className="text-2xl mb-4">Profile Page User Specific [id]:</p>
            <div className="p-2 bg-orange-500 text-white rounded-md">
                {params.id}
            </div>
            <Link href='/profile' className="text-blue-500 hover:underline mt-4">
                Back to Home
            </Link>
        </div>
    );
}
