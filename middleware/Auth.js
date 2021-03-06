module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Login Required');
        res.redirect('/user/login');
    },
    optionalAuthenticated: function(req, res, next) {
        return next();
    }
}