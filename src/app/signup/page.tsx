"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisable, setButtonDisable]= React.useState(false)
    const [loading,setLoading] = React.useState(false)

    const onSignUp = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            console.log("SignUp sucsess", response.data)
            setTimeout(()=>{
                toast.success("Account Created !")
            },1000)
            router.push("/login")

        }
        catch(error:any)
        {
            console.log("Error is this:", error)
            toast.error(error.message)

        }
        finally {
            setLoading(false)
        }

    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length >0 && user.username.length > 0){
            setButtonDisable(false)
        }
        else{
            setButtonDisable(true)
        }

    },[user])

    return (
        <>
        
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Create an account here !</h1>
                <h1 className="text-sm mx-3 my-3">{loading?"processing": "Signup opens..."}</h1>
                <hr />
                <label htmlFor="usename">username</label>
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                    className="px-4 py-2 mb-4  text-black rounded-md focus:outline-none focus:border-orange-300 "
                />
                <label htmlFor="email">email</label>
                <input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                    className="px-4 py-2 mb-4 text-black rounded-md focus:outline-none focus:border-orange-300 "
                />

                <label htmlFor="password">password</label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                    className="px-4 py-2 mb-4 rounded-md focus:outline-none focus:border-orange-300 text-black"
                />

                <button onClick={onSignUp} className=" mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-300">{buttonDisable ? "No signup" : "Signup" }</button>
                <Link href="/login">Already have an account?</Link>
                <span className="mt-5">
                    <Link href="/">Back to home</Link>
                </span>
            </div>
        </>
    )
}