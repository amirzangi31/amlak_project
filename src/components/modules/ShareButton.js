"use client"


import styles from '@/modules/ShareButton.module.css'
import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { LuShare2 } from 'react-icons/lu'

function ShareButton() {
    const [url , setUrl] = useState("")

    useEffect(()=>{
        setUrl(window.location.href)
    } , [])

    return (
        <CopyToClipboard text={url}>

            <div className={styles.container}>
                <LuShare2 />
                <button type="button">اشتراک گذاری</button>
            </div>
        </CopyToClipboard>
    )
}

export default ShareButton