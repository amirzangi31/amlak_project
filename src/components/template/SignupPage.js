
"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'



import styles from '@/template/SignupPage.module.css'

import toast, { Toaster } from 'react-hot-toast'

import Loader from '../modules/Loader'


function SignupPage() {

    const [form, setForm] = useState({
        email: "",
        password: "",
        rePassword: "",
    })

    const [loading, setLoading] = useState(false)



    const router = useRouter()


    const changeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const signupHandler = async (e) => {
        e.preventDefault()
        if (form.password !== form.rePassword) {
            toast.error("رمز و تکرار آن برابر نیست")
            return
        } else {
            setLoading(true)

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()
            if (res.status === 201) {
                toast.success(data.message)
                router.push("/signin")
                setLoading(false)
            } else {
                toast.error(data.error)
                setLoading(false)
            }
        }

    }

    return (
        <div className={styles.form}>

            <h4>فرم ثبت نام</h4>
            <form>
                <label >ایمیل : </label>
                <input type="text" name="email" value={form.email} onChange={changeHandler} />
                <label >رمز عبور : </label>
                <input type="password" name="password" value={form.password} onChange={changeHandler} />
                <label >تکرار رمز عبور : </label>
                <input type="password" name="rePassword" value={form.rePassword} onChange={changeHandler} />
                {
                    loading ?
                    <Loader />  :

                        <button type="submit" onClick={signupHandler}>ثبت نام</button>
                }

            </form>
            <p>
                حساب کاربری دارید ؟
                <Link href={"/signin"}>
                    ورود
                </Link>
            </p>
            <Toaster />
        </div>
    )
}

export default SignupPage