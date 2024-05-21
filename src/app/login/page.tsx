"use client";
import Link from "next/link";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const OnLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (err: any) {
      console.log("Login Failed", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisable(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login from here!</h1>
        <span className="mb-6 block text-center text-gray-600">
          {loading ? "Processing..." : "You can login now"}
        </span>
        <hr className="mb-6" />

        <form onSubmit={(e) => { e.preventDefault(); OnLogin(); }}>
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
            type="submit"
            className={`w-full py-2 px-4 mb-4 text-white rounded-md focus:outline-none ${buttonDisable ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={buttonDisable}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between">
          <Link href="/signup" className="text-blue-500 hover:underline">
            Don't have an account?
          </Link>
          <Link href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
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
