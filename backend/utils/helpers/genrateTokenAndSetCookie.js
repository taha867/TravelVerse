//we will create JWT token
import jwt from 'jsonwebtoken';

const genrateTokenAndSetCookie = (userID,res)=>{
const token = jwt.sign({userID},process.env.JWT_SECRET,{
expiresIn: '15d',
})

res.cookie("jwt", token, {
    httpOnly: true,//can't be access by browser to make it mores secure
    maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
    sameSite: "strict", //csrf
});

return token;
}

export default genrateTokenAndSetCookie;