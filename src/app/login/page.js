'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginInProgress, setLoginInProgress] = useState(true)
    const [userCreated, setUserCreated] = useState(false)
    const [error, setError] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoginInProgress(true)
        const response = await fetch('/api/login', {method: 'POST', body: JSON.stringify({email, password}), headers: {'Content-Type': 'application/json'},})
        if(response.ok){

        }else{

        }
        setLoginInProgress(false)
    }

  return (
    <section className="my-20 mx-auto bg-white rounded-lg py-12 max-w-lg">
        <h1 className="text-center text-primary text-4xl">Login</h1>
        <form className="block max-w-md mt-4 mx-auto" onSubmit={handleFormSubmit}>
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} disabled={loginInProgress} />
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} disabled={loginInProgress} />
            <button disabled={loginInProgress} className="mt-8" type="submit">Login</button>
            <p className="text-center font-thin mt-2 text-gray-400 text-sm">or</p>
            <button disabled={loginInProgress} className="mt-2 flex gap-2 items-center font-thin text-gray-500">
                <Image src={'/google.png'} alt="google logo" width={22} height={22} />
                Google
            </button>
        </form>
        <div className="text-center text-gray-500 mt-8">Don't have an account, <Link className="text-blue-500" href={'/register'}>Register</Link></div>
        <footer className="text-gray-400 text-xs text-center mt-16">
            &copy; 2024 All rights reserved
        </footer>
    </section>
  )
}

export default LoginPage