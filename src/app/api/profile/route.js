import Profile from "@/models/Profile"
import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import { Types } from "mongoose"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"



export async function GET(req) {

    try {
            await connectDB()

            const profiles = await Profile.find({published : true}).select("-userId")

        return NextResponse.json({data : profiles} , {status : 200})


    } catch (error) {
        return NextResponse.json({ error: "مشکلی در سرور اتفاق افتاده است" }, { status: 500 })
    }



}





export async function POST(req) {

    try {
        await connectDB()
        const body = await req.json()
        const { title, description, location, phone, price, realState, constructionDate, category, rules, amenities } = body

        const session = await getServerSession(req)
        if (!session) {
            return NextResponse.json({ error: "لطفا ابتدا وارد حساب کاربری خود شوید" }, { error: 401 })
        }
        const user = await User.findOne({ email: session.user.email })
        if (!user) {
            return NextResponse.json({ error: "حساب کاربری یافت نشد" }, { status: 404 })
        }

        if (!title || !description || !location || !phone || !price || !realState || !constructionDate || !category || !rules || !amenities) {
            return NextResponse.json({ error: "لطفا اطلاعات معتبر وارد کنید" }, { status: 400 })
        }

        const newProfile = await Profile.create({ title, description, location, phone, price: +price, realState, constructionDate, category, rules, amenities , userId : new Types.ObjectId(user._id) })
        return NextResponse.json({message : "آگهی با موفقیت ساخته شده است"} , {status : 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "مشکلی در سرور اتفاق افتاده است" }, { status: 500 })
    }



}

export async function PATCH(req) {


    try {
        await connectDB()
        const body = await req.json()
        const { _id ,  title, description, location, phone, price, realState, constructionDate, category, rules, amenities } = body

        const session = await getServerSession(req)
        if (!session) {
            return NextResponse.json({ error: "لطفا ابتدا وارد حساب کاربری خود شوید" }, { error: 401 })
        }
        const user = await User.findOne({ email: session.user.email })
        if (!user) {
            return NextResponse.json({ error: "حساب کاربری یافت نشد" }, { status: 404 })
        }

        if (!_id || !title || !description || !location || !phone || !price || !realState || !constructionDate || !category || !rules || !amenities) {
            return NextResponse.json({ error: "لطفا اطلاعات معتبر وارد کنید" }, { status: 400 })
        }


        const profile = await Profile.findOne({_id})
        console.log(profile)
        console.log(user)
        if(!user._id.equals(profile.userId)){
            return NextResponse.json({error : "دسترسی شما به این آگهی محدود شده است"}  , {status : 403})
        }


        profile.title = title
        profile.description = description
        profile.location = location
        profile.phone = phone
        profile.price = price
        profile.realState = realState
        profile.constructionDate = constructionDate
        profile.category = category
        profile.rules = rules
        profile.amenities = amenities
        profile.save()

        return NextResponse.json({message : "ویرایش آگهی با موفقیت انجام شد"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "مشکلی در سرور اتفاق افتاده است" }, { status: 500 })
    }



}