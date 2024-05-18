"use client";
import React, {useState} from "react";
import { toast } from "react-hot-toast";
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const [userData, setData] = useState('');
    
    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout Successfully!');
            router.push('/login');
        } catch (error: any) {
            console.log("Error in logout", error);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/tokendata')
        console.log("it's coming from the frontend",res.data);
        setData(res.data.data._id)
    }
    
    {console.log("check for setData is setting or not", userData)}
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Dashboard for User</h1>
            <hr />
            <p>Profile is coming</p>
            <hr />
            {userData && <><h1>User data is <span className="bg-green-400  rounded-md"> <Link href={`/profile/${userData}`}>{userData}</Link></span></h1></>}
            <button
                onClick={onLogout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>



            <button
                onClick={getUserDetails}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
                Get User Details
            </button>
        </div>
    );
}
