"use client"
import { useRouter } from 'next/navigation';

import styles from '@/modules/DashboardCard.module.css'
import Card from './Card'

import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Loader from './Loader';
import { ThreeDots } from 'react-loader-spinner';


function DashboardCard({ data }) {

    const [loading, setLoading] = useState(false)


    const router = useRouter()


    const editHandler = () => {
        router.push(`/dashboard/my-profiles/${data._id}`)

    }
    const deleteHandler = async () => {
        setLoading(true)
        const res = await fetch(`/api/profile/delete/${data._id}`, { method: "DELETE" })
        const dataF = await res.json()

        if (dataF.error) {
            toast.error(dataF.error)
            setLoading(false)
        } else {
            toast.success(dataF.message)
            router.refresh()
            setLoading(false)
        }

    }



    return (
        <div className={styles.container}>
            <Card data={data} />
            <div className={styles.main}>
                <button type="button" onClick={editHandler}>
                    ویرایش
                    <FiEdit />
                </button>
                {
                    loading ? <ThreeDots
                        width={40}
                        height={20}
                        wrapperStyle={{ margin: "auto" }}

                        color="#db0505"
                        ariaLabel="three-dots-loading"


                        visible={true}
                    /> : <button type="button" onClick={deleteHandler}>
                        حذف
                        <AiOutlineDelete />
                    </button>
                }
            </div>
            <Toaster />
        </div>
    )
}

export default DashboardCard
