const GoogleStrategy=require('passport-google-oauth20').Strategy
const mongoose=require('mongoose')
const User=require('../models/users')
const passport=require('passport')

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'https://vasu-google-auth.herokuapp.com/auth/google/callback'
},
async (accessToken,refreshToken,profile,done)=>{
    const newUser={
        googleId:profile.id,
        displayName:profile.displayName,
        firstName:profile.name.givenName,
        lastName:profile.name.familyName,
        image:profile.photos[0].value
    }

    try{
            let user=await User.findOne({googleId:profile.id})

            if(!user)
            {
                user= await User.create(newUser)
                done(null,user)
            }else{
                done(null,user)
            }

    }catch(err){
        console.log(err)
    }
}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
    console.log('serializeUser')
})
passport.deserializeUser((id,done)=>{
    
    User.findById(id,(err,user)=>{
        done(err,user)
        
    })
})