import Profile from "@/models/Profile"
import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"



export async function PATCH(req, context) {

    try {
        await connectDB()


        const id = context.params.profileId

        const session = await getServerSession(req)
        if (!session) {
            return NextResponse.json({ error: "لطفا ابتدا وارد حساب کاربری خود شوید" }, { error: 401 })
        }
        const user = await User.findOne({ email: session.user.email })
        if (!user) {
            return NextResponse.json({ error: "حساب کاربری یافت نشد" }, { status: 404 })
        }

        if (user.role !== "ADMIN") {
            return NextResponse.json({ error: "دسترسی محدود میباشد " }, { status: 403 })
        }


        const profile = await Profile.findOne({ _id: id })

        if (!profile) {
            return NextResponse.json({ error: "آگهی مورد نظر یافت نشد" }, { status: 404 })
        }


        profile.published = true
        profile.save()


        return NextResponse.json({ message: "آگهی با موفقیت انتشار شد" }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "مشکلی در سرور اتفاق افتاده است" }, { status: 500 })
    }



}