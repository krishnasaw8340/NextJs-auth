"use client"
import axios from "axios"
import Link from "next/link"
import React, {useState, useEffect} from "react"
import { useRouter } from "next/navigation";

export default function ResetThePassword () {
    const router = useRouter();
    const [token, setToken] = useState('')
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmitResetPass = async(e:any) => {
        e.preventDefault();
        try{
            const user = await axios.post("/api/users/reset-password", {
                token,
                password,
            });
            setPasswordUpdated(true);
            router.push("/login");
        }
        catch(error:any)
        {
            setError(error.user.data)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])
    return (
        <>

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h3 className="text-xl font-semibold mb-4">Reset your password</h3>
      <form 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center" 
        onSubmit={handleSubmitResetPass}
      >
        <label htmlFor="password" className="mb-2 font-medium">New Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <label htmlFor="confirmPassword" className="mb-2 font-medium">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button 
    
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
      <div className="flex justify-between">
          <Link href="/signup" className="text-blue-500 hover:underline">
            Don't have an account?
          </Link>
          <Link href="/forgot-email" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-5 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to home
          </Link>
        </div>
    </div>
        </>
    )
}