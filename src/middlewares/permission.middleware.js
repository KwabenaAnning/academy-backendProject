const validApplicant = (req, res, next) => {
    if (req.data && req.data.role !== 'user') {
        return res.status(403).json({
            code: 403,
            status: 'error',
            message: 'you are not a normal user.',
            data: null
        })
    }
    next();
}

const validAdmin = (req, res, next) => {
    if (req.data && req.data.role !== 'superAdminstrator') {
        return res.status(403).json({
            code: 403,
            status: 'error',
            message: 'you are not an admin. Use an Admin Token',
            data: null
        })
    }
    next();
}


 module.exports = {
     validApplicant,
     validAdmin
 }