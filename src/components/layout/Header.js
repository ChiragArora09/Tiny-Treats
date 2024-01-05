'use client'
import Link from "next/link"
import {useSession, signOut} from 'next-auth/react'

const Header = () => {
  const session = useSession()
  const status = session.status

  return (
    <header className='flex items-center justify-between'>
        <nav className='flex gap-8 items-center text-gray-500 font-medium'>
          <Link href={'/'} className='text-primary font-semibold text-2xl'>Tiny Treats</Link>
          <Link href={'/'}>Home</Link>
          <Link href={''}>Menu</Link>
          <Link href={''}>About</Link>
          <Link href={''}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          {status === 'authenticated' && (
            <Button className='bg-primary rounded-full text-white px-6 py-2' onClick={() => signOut()}>Logout</Button>
          )}
          {status === 'unauthenticated' && (
            <>
              <Link href={'/register'} className='bg-primary rounded-full text-white px-6 py-2'>Register</Link>
              <Link href={'/login'}>Login</Link>
            </>
          )}
        </nav>
    </header>
  )
}

export default Header