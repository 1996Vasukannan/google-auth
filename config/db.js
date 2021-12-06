const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log(`running db`)

    }catch(error){
        console.log(error)
    }
}

module.exports=connectDB