
"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {signIn, signOut} from 'next-auth/react'


import styles from '@/template/SignupPage.module.css'

import toast, { Toaster } from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'



function SigninPage() {

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)



    const router = useRouter()


    const changeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const signinHandler = async (e) => {
        e.preventDefault()
        if(!form.email || !form.password){
            toast.error("لطفا ایمیل و رمز عبور را وارد کنید")
        }else{
            setLoading(true)
            const res  =  await signIn("credentials" , {
                email : form.email,
                password : form.password,
                redirect : false
            })
            
            if(res.error === null ){
                router.push("/")
                setLoading(false)
            }else {
                toast.error(res.error)
                setLoading(false)
            }
        }
        
    }

    return (
        <div className={styles.form}>

            <h4>فرم ورود</h4>
            <form>
                <label >ایمیل : </label>
                <input type="text" name="email" value={form.email} onChange={changeHandler} />
                <label >رمز عبور : </label>
                <input type="password" name="password" value={form.password} onChange={changeHandler} />
                
                {
                    loading ?
                        <ThreeDots
                            height={45}
                            wrapperStyle={{ margin: "auto" }}

                            color="#304ffe"
                            ariaLabel="three-dots-loading"


                            visible={true}
                        /> :

                        <button type="submit" onClick={signinHandler}> ورود</button>
                }

            </form>
            <p>
                حساب کاربری ندارید ؟
                <Link href={"/signup"}>
                    ثبت نام
                </Link>
            </p>
            <Toaster />
        </div>
    )
}

export default SigninPage