import connectDB from '@/utils/connectDB'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import User from '@/models/User'
import DashboardSideBar from '@/components/layout/DashboardSideBar'
import AdminPage from '@/components/template/AdminPage'
import Profile from '@/models/Profile'

export const metadata = {
    title: ' پنل ادمین ',
  }
  


async function Admin() {
    await connectDB()
    const session = await getServerSession(authOptions)

    if (!session) redirect("/signin")


    const user = await User.findOne({ email: session.user.email })
    if (!user) return <h3>مشکلی پیش امده است</h3>

    if (user.role !== "ADMIN") redirect("/dashboard")

    const profiles = await Profile.find({ published: false })



    return (
        <DashboardSideBar role={user.role} email={session.user.email}>
            <AdminPage  profiles={profiles}/>
        </DashboardSideBar>
    )
}

export default Admin