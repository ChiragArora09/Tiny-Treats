'use client'
import { useState } from "react"
import Image from "next/image"
import {signIn} from "next-auth/react"
import Link from "next/link"

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginInProgress, setLoginInProgress] = useState(false)

  return (
    <section className="my-20 mx-auto bg-white rounded-lg py-12 max-w-lg">
        <h1 className="text-center text-primary text-4xl">Login</h1>
        <form className="block max-w-md mt-4 mx-auto">
            <input name="email" type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} disabled={loginInProgress} />
            <input name="password" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} disabled={loginInProgress} />
            <button type="button" disabled={loginInProgress} className="mt-8 bg-primary text-white" onClick={() => signIn('credentials', {email, password, callbackUrl: '/'})} >Login</button>
            <p className="text-center font-thin mt-2 text-gray-400 text-sm">or</p>
            <button type="button" disabled={loginInProgress} className="mt-2 flex gap-2 items-center font-thin text-gray-500" onClick={(e) =>{e.preventDefault(); signIn('google', {callbackUrl: '/'})}}>
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