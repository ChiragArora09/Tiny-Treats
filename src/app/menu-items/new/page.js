'use client';

import EditingImage from "@/components/layout/EditingImage";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";


export default function NewMenuItemPage() {
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    
    const [redirectToItems, setRedirectToItems] = useState(false)

    const {loading, data} = useProfile()

    async function handleFormSubmit(e){
        e.preventDefault()
        const data = { image, name, description, price }
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            })
            if(response.ok)
                resolve()
            else
                reject()
        })
        await toast.promise(savingPromise, {
            loading: 'Saving this item',
            success: 'Saved',
            error: 'Error'
        })
        setRedirectToItems(true)
    }

    if(redirectToItems){
        return redirect('/menu-items')
    }

    if(loading){
        return 'loading user info...'
    }

    if(!data.admin){
        return "Not an admin"
    }



  return (
    <section className='mt-8'>
        <UserTabs isAdmin={true} />
        <div className="max-w-md mx-auto mt-8">
            <Link href={'/menu-items'} className="flex w-full justify-center gap-2 font-semibold bg-[#B85E2D] text-white border border-gray-300 rounded-xl px-6 py-2">
                <span>Show all menu items</span>
            </Link>
        </div>
        <form onSubmit={handleFormSubmit} className='mt-8 max-w-md mx-auto'>
            <div className="grid items-start gap-4" style={{gridTemplateColumns: '.3fr .7fr'}}>
                <div>
                    <EditingImage link={image} setLink={setImage} />
                </div>
                <div className='grow'>
                    <label>Menu Item</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    <label>Description</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    <label>Price</label>
                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
                    <button type='submit'>Save</button>
                </div>
            </div>
        </form>
    </section>

  );
}