/**
 * Created by spatialx on 9/8/15.
 */
var _ = require('underscore-contrib');
var express = require('express');
var Firebase = require('firebase');
var thoughtixRef = new Firebase("https://thoughtix.firebaseio.com/");
var accounts = thoughtixRef.child("Mappings/Accounts"), users = thoughtixRef.child("Users");

var userProfileFactory = {
    profileConfigurer: function(provider){
        var provider = provider;
        var configureProfile = function(request, accessToken, refreshToken, profile, done){
            accounts.on("value",function(snapshot){
                var accMap = snapshot.val();
                if(accMap.hasOwnProperty(profile.id)){
                    return done(null,profile);
                }else{
                    var newUser = users.push();
                    newUser.set({ UserID : profile.id, Profile:profile }, function(error){
                        if(error){
                            return done(error,profile);
                        }
                        var userObj = new Object();
                        userObj[profile.id] = newUser.key();
                        accounts.set(userObj, function(error){
                            if(error){
                                return done(error,profile);
                            }else {
                                return done(null, profile);
                            }
                        });
                    });
                }
            });
        }
        return {
            configure: function(request, accessToken, refreshToken, profile, done){
                configureProfile(request,accessToken, refreshToken, profile, done);
            }
        }
    }
};

module.exports = userProfileFactory;

