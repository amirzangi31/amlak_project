
"use client"

import styles from '@/modules/AdminCard.module.css'
import { sp } from '@/utils/replaceNumber'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'

function AdminCard({ data }) {
  const [loading, setLoading] = useState(false)
  const [loadingD, setLoadingD] = useState(false)
  const router = useRouter()


  const publishHandler = async () => {
    setLoading(true)
    const res = await fetch(`/api/profile/publish/${data._id}`, { method: "PATCH" })
    const result = await res.json()
    setLoading(false)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(result.message)
      router.refresh()
    }

  }

  const deletHandler = async () => {
    setLoadingD(true)
    const res = await fetch(`/api/profile/delete/${data._id}`, { method: "DELETE" })
    const result = await res.json()
    setLoadingD(false)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(result.message)
      router.refresh()
    }
  }

  const submitHandler = async() =>{
    const res = await fetch("/api/together", {
      method: "POST",
      body: JSON.stringify({
        name : "asmi",
        email : "asmi",
        subject : "asmi",
        message : "asmi",
      })
    })

    const data = await res.json()

    console.log(data)
  }


  return (
    <div className={styles.container}>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <div className={styles.properties}>
        <span>{data.location}</span>
        <span>{sp(data.price)} تومان</span>
      </div>
      <div className={styles.buttons}>

        {
          loading ? <ThreeDots
            width={40}
            height={20}
            wrapperStyle={{ margin: "auto" }}

            color="#00a800"
            ariaLabel="three-dots-loading"


            visible={true}
          /> :
            <button type="button" onClick={publishHandler}>انتشار</button>
        }
        {
          loadingD ? <ThreeDots
            width={40}
            height={20}
            wrapperStyle={{ margin: "auto" }}

            color="#db0505"
            ariaLabel="three-dots-loading"


            visible={true}
          /> :
            <button type="button" onClick={deletHandler}>حذف</button>
        }
        <button type="button" onClick={submitHandler}>test</button>
      </div> 
      <Toaster />
    </div>
  )
}

export default AdminCard