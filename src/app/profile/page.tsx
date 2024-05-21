"use client"
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState('');

    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout Successfully!');
            router.push('/login');
        } catch (error:any) {
            console.log("Error in logout", error);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/tokendata');
            console.log("User data:", res.data.data._id);
            setUserData(res.data.data._id);
        } catch (error) {
            console.log("Error fetching user details", error);
            toast.error("Failed to fetch user details");
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard for User</h1>
            <hr className="w-16 border-t-2 mb-4 border-gray-400" />
            <p className="text-lg mb-4">Profile is coming soon...</p>
            <hr className="w-16 border-t-2 mb-4 border-gray-400" />
            {userData && (
                <div className="mb-4">
                    <h1 className="text-xl mb-2">User data:</h1>
                    <p className="bg-green-400 rounded-md p-2">
                        <Link href={`/profile/${userData}`}>
                            <span className="text-white cursor-pointer">
                                {userData}
                            </span>
                        </Link>
                    </p>
                </div>
            )}
            <button
                onClick={onLogout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none mb-2"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
                Get User Details
            </button>
        </div>
    );
}
