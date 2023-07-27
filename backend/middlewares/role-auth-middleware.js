/**
 * 
 * @param {*} roles
 * Role can be an array or a string 
 */

const roleAuthentication = (roles) =>{
    return (req, res, next)=>{
        const user = req.user;
        if(!user){
            res.status(401)
            res.json({
                success: false,
                message: "Unauthorized access"
            })
        }else{
            const userRoles = user.roles || []
            if(!Array.isArray(roles)){
                return userRoles.includes(roles)?next():res.json({
                    success: false,
                    message: "Unauthorized Access"
                })
            }else{
                let authorized = false;
                for (const role of roles) {
                    for (const userRole of userRoles) {
                        if(role == userRole){
                            authorized = true;
                        };
                    };
                };
                if(authorized){
                    next();
                }else{
                    res.json({
                        success: false,
                        message: "Unauthorized access"
                    })
                }
            }
        }
    }
}
module.exports = roleAuthentication;