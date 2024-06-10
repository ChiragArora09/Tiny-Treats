'use client'

import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import Link from 'next/link'
import {useState, useEffect} from "react";
import Image from "next/image"

const page = () => {
    const [menuItems, setMenuItems] =  useState([])
    const {loading, data} = useProfile()

    useEffect(() => {
      fetch('/api/menu-items').then(res => {
        res.json().then(menuItems => {
            setMenuItems(menuItems)
        })
      })
    }, [])
    

    if(loading){
        return 'loading user info...'
    }

    if(!data.admin){
        return "Not an admin"
    }

  return (
    <section className='mt-8 max-w-2xl mx-auto'>
        <UserTabs isAdmin={true} />
        <div className="mt-8">
            <Link className="button flex" href={'/menu-items/new'}>
                <span>Crete new menu item</span>
            </Link>
        </div>
        <div>
            <h2 className='text-sm text-gray-500 mt-8'>EDIT MENU ITEMS</h2>
            <div className='grid grid-cols-4'></div>
            {menuItems?.length>0 && menuItems.map(item => (
                <Link href={'/menu-items/edit/'+item._id} className='button mb-1 bg-white'>
                    <div className='relative w-24 h-24'>
                        <Image src={item.image} alt={""} width={100} height={100} />
                    </div>
                    {item.name}
                </Link>
            ))}
        </div>
    </section>
  )
}

export default page