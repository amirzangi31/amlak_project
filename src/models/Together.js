import { Schema, model, models } from 'mongoose'


const togetherSchema = new Schema({
  
    name : {
        type : String 
    },
    email : {
        type : String 
    },
    subject : {
        type : String 
    },
    message : {
        type : String 
    },

},
{
    timestamps : true
})


const Together = models.Together || model("Together", togetherSchema)


export default Together







