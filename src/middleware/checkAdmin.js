const isAdmin = true

function checkAdmin(req,res,next){

    if(!isAdmin) return res.json({ error: 'acces denied' , descripcion: `You do not have permission for this route  ${req.originalUrl}`, code: '403'})

    return next()
}


module.exports = checkAdmin