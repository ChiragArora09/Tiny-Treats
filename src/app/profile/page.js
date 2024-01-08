'use client'
import { redirect} from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const profilePage = () => {
    const session = useSession()
    const [username, setUsername] = useState('')
    const [saved, setSaved] = useState('')
    const {status} = session

    useEffect(() => {
        if(status === "authenticated"){
            setUsername(session.data.user.name)
        }
    }, [status, session])

    const handleProfileInfo = async (e) => {
        e.preventDefault()
        setSaved(false)
        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name:username})
        })
        if(res.ok){
            setSaved(true)
        }
    }

    const handleImageChange = async (e) => {
        const files = e.target.files
        if(files?.length === 1){
            const data = new FormData
            data.set('file', files[0])
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
        }
    }

    if(status === "loading"){
        return 'Loading...'
    }
    if(status === "unauthenticated"){
        redirect('/login')
    }

    const userImg = session.data.user.image
    
    return (
    <section className="mt-20">
        <h1 className="text-center text-primary text-4xl mb-8">My Account</h1>
        {saved && (
            <h3 className='text-center bg-green-200 p-4 rounded-lg mb-3 text-gray-600'>Please login again to see updated profile!</h3>
        )}
        <div className='max-w-lg mx-auto border border-gray-200 shadow-lg px-10 py-8 rounded-xl'>
            <div className='flex gap-4 items-center'>
                <div className='flex flex-col items-center gap-1'>
                    {userImg && (
                        <>
                        <Image src={userImg} width={100} height={100} className='rounded-full' alt='avatar' />
                        <input id='file' type="file" className='hidden' onChange={handleImageChange} />
                        <label className='cursor-pointer' htmlFor='file'>
                            <span className='text-black text-xs border border-gray-600 px-1 py-0.5 rounded-md'>Change Avatar</span>
                        </label>
                        </>
                    )}
                    {!userImg && (
                        <>
                        <div className='flex flex-col items-center bg-white justify-center w-20 h-20 rounded-full'>
                            <div className='text-7xl text-primary'>{session.data.user.email[0]}</div>
                            <div className='h-2 w-2'></div>
                        </div>
                        <input id='file' type="file" className='hidden' onChange={handleImageChange} />
                        <label className='cursor-pointer' htmlFor='file'>
                            <span className='text-black text-xs border border-gray-600 px-1 py-0.5 rounded-md'>Change Avatar</span>
                        </label>
                        </>
                    )}
                </div>
                <form className='grow' onSubmit={handleProfileInfo}>
                    <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
                    <input type="text" disabled={true} value={session.data.user.email} />
                    <button className='bg-green-500' type='submit'>Save</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default profilePage