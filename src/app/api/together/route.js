import Together from "@/models/Together"
import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"



export const POST = async (req) => {
    try {
        await connectDB()
        const { name, email, subject, message } = await req.json()
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "invalid data " }, { status: 400 })
        }
        const together = await Together.create({ name, subject, email, message })
        return NextResponse.json({ message: "Your request has been successfully sent (thank you for your choice)" }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در سرور اتفاق افتاده است" }, { status: 500 })
    }
}

export const GET = async (req) => {

    try {
        await connectDB()

        const session = await getServerSession(req)
        if (!session) {
            return NextResponse.json({ error: "لطفا وارد حساب کاربری خود شوید" }, { error: 401 })
        }

        const user = await User.findOne({ email: session.user.email })
        if (!user) {
            return NextResponse.json({ error: "حساب کاربری یافت نشد!" }, { status: 404 })
        }

        if (user.role !== "ADMIN") {
            return NextResponse.json({ error: "دسترسی شما محدود است" })
        }

        const togethers = await Together.find()

        return NextResponse.json({ data: togethers }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "مشکلی در سرور اتفاق افتاده است" }, { status: 500 })
    }


}