"use client";
import Link from "next/link";
import React, { useState, useEffect }  from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";




export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisable, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false)

    const OnLogin = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            console.log("Login Successful", response.data)
            toast.success("Login Success")
            router.push("/profile")

        }
        catch(err:any)
        {
            console.log("Login Failed", err)
            toast.error(err.message)
        }

    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0)
            {
                setButtonDisable(false)
            }
            else {
                setButtonDisable(true)
            }

    },[user])
    return (
        <>
            {/* <h1 className="text-green-400 font-medium rounded text-center">This is Sign UP page: </h1> */}
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Login from here!</h1>
                <span>{loading ? " Processing...": "You can login now"}</span>
                <hr />

                <label htmlFor="email">email</label>
                <input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                    className="px-4 py-2 mb-4 text-black rounded-md focus:outline-none focus:border-orange-300 "
                />

                <label htmlFor="passsword">password</label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                    className="px-4 py-2 mb-4 text-black rounded-md focus:outline-none focus:border-orange-300 "
                />

                <button onClick={OnLogin} className=" p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-300">Login</button>
                <Link href="/signup">Don't have an account ?</Link>
            </div>
        </>
    )
}