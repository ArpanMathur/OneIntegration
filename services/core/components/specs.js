/**
 * Created by spatialx on 9/8/15.
 */
var Firebase = require('firebase');
var _ = require('underscore-contrib');
var passport = require('passport');
var refTable =
    new Firebase("https://thoughtix.firebaseio.com/Security/Keys/Google");

var specs = {
    authSpecs: function(){
        return {
            paramsForStrategy : function(entity, baseuri, pathuri, callback){

                passport.serializeUser(function(user,done){
                    done(null,user);
                });

                passport.deserializeUser(function(user,done){
                    done(null,user);
                });

                refTable.on("value",function(snapshot){
                    var snapData = snapshot.val();
                    var callbackURL = baseuri + pathuri + '/return';
                    var secureKey = {
                        clientID : snapData["ClientID"],
                        clientSecret : snapData["Secret"],
                        callbackURL : callbackURL,
                        passReqToCallback: true
                    };
                    callback(secureKey);
                });
            }
        }
    }
};

module.exports = specs;