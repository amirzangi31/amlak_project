import Profile from "@/models/Profile"
import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function DELETE(req, context) {
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
        const profile = await Profile.findOne({_id  :id})


        if(user.role==="USER"){
            if(!user._id.equals(profile.userId)){
                return NextResponse.json({error : "دسترسی شما به این آگهی محدود شده است"}  , {status : 403})
            }
        }


        await Profile.deleteOne({_id : id})

        return NextResponse.json({message : "آگهی با موفقیت حذف شد"}  ,{status : 200})
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "مشکلی در سرور اتفاق افتاده است" }, { status: 500 })
    }


}