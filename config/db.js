const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log(`running db`)

    }catch(error){
        console.log(error)
    }
}

module.exports=connectDB