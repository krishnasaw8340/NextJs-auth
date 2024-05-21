"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp success", response.data);
      setTimeout(() => {
        toast.success("Account Created!");
      }, 1000);
      router.push("/login");
    } catch (error: any) {
      console.log("Error is this:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisable(!(user.email.length > 0 && user.password.length > 0 && user.username.length > 0));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create an account here!</h1>
        <span className="block text-center text-gray-600 mb-6">
          {loading ? "Processing..." : "Signup opens..."}
        </span>
        <hr className="mb-6" />

        <label htmlFor="username" className="block mb-2 font-medium">Username</label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
        />

        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
        />

        <label htmlFor="password" className="block mb-2 font-medium">Password</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
        />

        <button
          onClick={onSignUp}
          className={`w-full py-2 px-4 mb-4 text-white rounded-md focus:outline-none ${buttonDisable ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={buttonDisable}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="flex justify-between">
          <Link href="/login" className="text-blue-500 hover:underline">
            Already have an account?
          </Link>
        </div>

        <div className="mt-5 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
