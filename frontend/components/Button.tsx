"use client"

import { useRouter } from "next/navigation"



export function Button({link, Name}:{link : String , Name : String }){
    const router = useRouter();
    return (
        <>
        <button onClick={()=>router.push(`${link}`)}>
            {Name}
        </button>
        </>
    )
}