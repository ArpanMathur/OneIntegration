/**
 * Created by spatialx on 9/8/15.
 */
var async = require('async');
var passport = require('passport');
var underscore = require('underscore');
var express = require('express');
var router = express.Router();
var session = require('express-session');

var authScope = {
    scope : "https://www.googleapis.com/auth/plus.login"
};

router.get('/google',passport.authenticate('google', authScope));

router.get('/google/return', passport.authenticate('google',{
        failureRedirect: '/apps/quantum/shell?user=invalid'
    }),function(req,res){
         res.redirect('/apps/quantum/mesh?user_id='+req.user.id);
    });

module.exports = router;


