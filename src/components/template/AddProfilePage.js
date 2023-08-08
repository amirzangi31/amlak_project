"use client"

import styles from '@/template/AddProfilePage.module.css'
import { useEffect, useState } from 'react'
import TextInput from '../modules/TextInput'
import RadioList from '../modules/RadioList'
import TextList from '../modules/TextList'
import CustomDatePicker from '../modules/CustomDatePicker'

import toast, { Toaster } from 'react-hot-toast'
import Loader from '../modules/Loader'
import { useRouter } from 'next/navigation'


function AddProfilePage({data}) {

    const [loading, setLoading] = useState(false)

    const [profileData, setProfileData] = useState({
        title:  "",
        description:  "",
        location:  "",
        phone:  "",
        price:  "",
        realState:  "",
        constructionDate:  new Date(),
        category:  "villa",
        rules:  [],
        amenities:  []
    })

    const router = useRouter()


    useEffect(() => {
        if(data) setProfileData(data)

     // eslint-disable-next-line react-hooks/exhaustive-deps
     } , [])


    const submitHandler = async () => {
        setLoading(true)
        const res = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify(profileData),
            headers: { "Content-Type": "application/json" }
        })

        const data = await res.json()
        if (data.error) {

            setLoading(false)
            toast.error(data.error)
        } else {
            setProfileData({
                title: "",
                description: "",
                location: "",
                phone: "",
                price: "",
                realState: "",
                constructionDate: new Date(),
                category: "villa",
                rules: [],
                amenities: []
            })
            setLoading(false)
            toast.success(data.message)
            router.refresh()
        }

    }


    const editHandler = async() => {
            setLoading(true)
            const res = await fetch("/api/profile" , {
                method : "PATCH",
                body : JSON.stringify(profileData),
                headers : {"Content-Type" : "application/json"}
            })

            const data = await res.json()
            setLoading(false)
            if(data.error){
                toast.error(data.error)
            }else{
                toast.success(data.message)
                router.refresh()
            }

    }




    return (
        <div className={styles.container}>
            <h3>{data ? "ویرایش آگهی" : "ثبت آگهی"}</h3>
            <TextInput profileData={profileData} setProfileData={setProfileData} name="title" title="عنوان آگهی" />
            <TextInput profileData={profileData} setProfileData={setProfileData} name="description" title="توضیحات" textarea={true} />
            <TextInput profileData={profileData} setProfileData={setProfileData} name="location" title="موقعیت" />
            <TextInput profileData={profileData} setProfileData={setProfileData} name="phone" title="شماره تماس" />
            <TextInput profileData={profileData} setProfileData={setProfileData} name="price" title="قیمت" />
            <TextInput profileData={profileData} setProfileData={setProfileData} name="realState" title="بنگاه" />
            <RadioList profileData={profileData} setProfileData={setProfileData} />
            <TextList title="امکانات رفاهی" profileData={profileData} setProfileData={setProfileData} type="amenities" />
            <TextList title="قوانین" profileData={profileData} setProfileData={setProfileData} type="rules" />
            <CustomDatePicker profileData={profileData} setProfileData={setProfileData} />
            {
                loading ?
                    <Loader />
                    :
                    data ? (

                        <button type="button" className={styles.submit} onClick={editHandler}>ویرایش آگهی</button>
                    ) :
                        (
                            <button type="button" className={styles.submit} onClick={submitHandler}>ثبت آگهی</button>
                        )
            }
            <Toaster />

        </div>
    )
}

export default AddProfilePage