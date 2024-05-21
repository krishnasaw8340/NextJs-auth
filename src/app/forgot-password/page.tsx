"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');

  const handleSubmitForgotPass = () => {
   
    // Handle form submission
  };

 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h3 className="text-xl font-semibold mb-4">Reset your password here:</h3>
      <form 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center" 
        onSubmit={handleSubmitForgotPass}
      >
        <label htmlFor="email" className="mb-2 font-medium">Enter email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e:any)=>setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Reset password
        </button>
      </form>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Back to home
      </Link>
    </div>
  );
}
