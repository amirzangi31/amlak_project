import BuyResidentialPage from '@/components/template/BuyResidentialPage'
import Profile from '@/models/Profile'
import connectDB from '@/utils/connectDB'

async function BuyResidential({searchParams}) {


        
        await connectDB()


    if(searchParams.category) {
        const profiles = await Profile.find({category : searchParams.category , published : true})

        return (
            <BuyResidentialPage data={JSON.parse(JSON.stringify(profiles))} />
        )
    }



    const profiles = await Profile.find({ published : true})

    
    return (
        <BuyResidentialPage data={JSON.parse(JSON.stringify(profiles))} />
    )
}

export default BuyResidential