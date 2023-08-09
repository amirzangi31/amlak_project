import DetailPage from '@/components/template/DetailPage'
import Profile from '@/models/Profile'
import connectDB from '@/utils/connectDB'


async function ProfileDetails({ params }) {
    await connectDB()

    const id = params.profileId

    const profile = await Profile.findOne({ _id: id })


    if(!profile) return <h3>مشکلی پیش امده است</h3>


    return (
        <DetailPage data={profile} /> 
    )
}

export default ProfileDetails




export const generateMetadata = async({params : {profileId}}) => {
    await connectDB()
    const profile = await Profile.findOne({ _id: profileId })


    return {
        title : profile.title,
        description : profile.description,
        keywords : ["amir" , "test" , "smarten"]
    }

}