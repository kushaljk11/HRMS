export function profileMiddleWare (req, res, next) {
    res.locals.user = req.session.user
    next()
}   