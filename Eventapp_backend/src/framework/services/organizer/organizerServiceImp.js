import jwt from 'jsonwebtoken';
import config from '../../../config/config.js';
import bcrypt from 'bcrypt';

const organizerServiceImp = () => {

    const bcryptpassword= async(password)=>{
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        return hashpassword

    }
    
    const comparePassword = (password, hashPassword) => bcrypt.compare(password, hashPassword);

    const generateAccessToken=(user)=>jwt.sign({user},config.ACESS_TOKEN_SCERET,{expiresIn:'25m'})
    const generatRefreshToken=(user)=>jwt.sign({user},config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
    


  return {
    bcryptpassword,
    comparePassword,
    generateAccessToken,
    generatRefreshToken,
    

  }
}

export default organizerServiceImp
