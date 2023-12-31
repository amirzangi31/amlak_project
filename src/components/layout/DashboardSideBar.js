import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import styles from '@/layout/DashboardSideBar.module.css'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import LogoutButton from '../modules/LogoutButton'




async function DashboardSideBar({ children, email, role }) {

  const session = await getServerSession(authOptions)



  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <CgProfile />
        {role === "ADMIN" && <b>ادمین</b>}
        <p>{email}</p>
        <span></span>
        <div>

          <Link href={"/dashboard"}>حساب کاربری</Link>
          <Link href={"/dashboard/my-profiles"}>آگهی های من</Link>
          <Link href={"/dashboard/add"}> ثبت آگهی</Link>
          {role === "ADMIN" && <Link href={"/admin"}> در انتظار تایید </Link>}
          
        </div>
        <LogoutButton />
      </div>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}

export default DashboardSideBar