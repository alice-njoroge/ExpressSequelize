
const changePassword = async (req, res)=>{
    try{
        const token = req.params.token;
        await db.passwordResets.findOne({where:{tokenHash:token}})
    }catch (e){
        return res.status(400).json({message:"Token is invalid"})
    }
};
module.exports ={
    changePassword:changePassword
};