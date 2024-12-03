"use client"

import { useRouter } from "next/navigation"
import { Loading } from "./Loading";



export function ButtonFront({link, Name, loading}:{link : string , Name : string, loading: any }){
    const router = useRouter();
    function handler(){
        loading.setLoading(true);
        router.push(`${link}`)
        loading.setLoading(false);
    }
    return (
        <>
        <button onClick={handler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {Name}
        </button>
        </>
    )
}