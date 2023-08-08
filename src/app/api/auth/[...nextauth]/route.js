


import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/User'
import { verifyPassword } from '@/utils/auth'
import connectDB from '@/utils/connectDB'
import NextAuth from 'next-auth'

export const authOptions = {
    sessioin: { strategy: "jwt" },
    providers: [CredentialsProvider({
        async authorize(credentials) {
            const { email, password } = credentials
            try {
                await connectDB()
            } catch (error) {
                throw new Error("مشکلی در سرور رخ داده است  ")
            }


            if (!email || !password) {
                throw new Error("لطفا اطلاعات معتبر را وارد کنید")
            }


            const user = await User.findOne({ email })

            if (!user) throw new Error("لطفا ابتدا حساب کاربری ایجاد کنید ")

            const isVallid = await verifyPassword(password, user.password)
            if (!isVallid) throw new Error("ایمیل یا رمز عبور اشتباه هست")


            return { email }
        }
    })]
}


const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }


