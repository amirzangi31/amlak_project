import DashboardSideBar from '@/components/layout/DashboardSideBar'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import User from '@/models/User'

export const metadata = {
  title: ' پنل کاربری ',
}


async function DashboardLayout({children}) {


    const session = await getServerSession(authOptions)

    if(!session) redirect("/signin")
  const user = await User.findOne({email : session.user.email})

  if(!user) return <h3>مشکلی پیش آمده است</h3>


  return (
    <DashboardSideBar role={user.role} email={user.email}>{children}</DashboardSideBar>
  )
}

export default DashboardLayout;


