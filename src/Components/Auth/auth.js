import jwt from 'jsonwebtoken';

const authenticate=()=>{
    const token = localStorage.getItem('token');
    if(!token){
        return 
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        throw new Error("User is Unauthorized.")
    }
} 
export default authenticate;