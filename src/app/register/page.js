'use client'
import Image from "next/image"
import { useState } from "react"

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userCreated, setUserCreated] = useState(false)
    const [creatingUser, setCreatingUser] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setCreatingUser(true)
        await fetch('/api/register', {method: 'POST', body: JSON.stringify({email, password}), headers: {'Content-Type': 'application/json'},})
        setCreatingUser(false)

    }

    return (
        <section className="my-32 mx-auto bg-white rounded-lg py-12 max-w-lg">
            <h1 className="text-center text-primary text-4xl">Register</h1>
            <form className="block max-w-md mt-4 mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} disabled={creatingUser} />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} disabled={creatingUser} />
                <button disabled={creatingUser} className="mt-8" type="submit">Register</button>
                <p className="text-center font-thin mt-2 text-gray-400 text-sm">or</p>
                <button className="mt-2 flex gap-2 items-center font-thin text-gray-500">
                    <Image src={'/google.png'} alt="google logo" width={22} height={22} />
                    Sign up using your Google Account
                </button>
            </form>
        </section>
    )
}

export default RegisterPage