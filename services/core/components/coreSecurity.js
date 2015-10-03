/**
 * Created by spatialx on 9/8/15.
 */
var _ = require('underscore-contrib');
var async = require('async');
var authSpecs = require('./specs').authSpecs();
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var coreSecurity = {
    authenticator: function(baseuri, pathuri, passport){
        var userProfileFactory = require('./userProfileFactory');
        var configureSecurityCtx = function(provider){
            var provider = provider;
            authSpecs.paramsForStrategy(provider,baseuri, pathuri,function(secureKey){
                passport.use(new GoogleStrategy(secureKey, function(request, accessToken, refreshToken, profile, done){
                        userProfileFactory
                            .profileConfigurer(provider)
                            .configure(request, accessToken, refreshToken,profile, done);
                    }));
            });
        }

        return{
            configure: function(provider){
                configureSecurityCtx(provider);
            }
        }
    }
};

module.exports = coreSecurity;