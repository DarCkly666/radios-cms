export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.render('shared/error_401')
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.render('shared/error_403')
  }
  next()
}
