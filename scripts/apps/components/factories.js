/**
 * Created by spatialx on 9/6/15.
 */
var serviceFactories = angular.module('centerMesh.serviceFactories',[]);

serviceFactories
    .factory('User', function(){
        function User(profile){

        }

        User.prototype.get = function(){

        };

        return User;
    });
