module.exports =
(moduleName) => {

    return (req,res,next) => {

        if(
            !req.user.permissions.includes(
                moduleName
            )
        ){
            return res.status(403).json({
                success:false,
                message:"Access Denied"
            });
        }

        next();
    };
};