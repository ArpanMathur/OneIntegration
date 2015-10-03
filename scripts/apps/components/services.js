
/**
 * Created by spatialx on 9/6/15.
 */
var thinkerServices = angular.module('centerMesh.thinkerServices',[]);

thinkerServices.service('QueryService',['$q','$http',function($q,$http){
    return{
        queryServerOn:function(actionURL){
            var $actionURI = actionURL;
            return{
                withQuantumAndWait: function(params){
                    var $deferred = $q.defer();
                    var $params= params;
                    var $destiny = function() {
                        return $http({
                            headers: {'Content-Type': 'application/json'},
                            url: $actionURI,
                            method: "POST",
                            data: {quanta:$params}
                        });
                    }

                    $destiny()
                        .success(function(theQThing){
                            $deferred.resolve(theQThing);
                        }).error(function(theQThing){
                            $deferred.reject(theQThing);
                        });

                    return $deferred.promise;
                }
            }
        }
    }
}]);

thinkerServices
    .service('SignUpService',['$q','$http','$log','QueryService','User',function($q,$http,$log,QueryService,User){
        return {
            registerUser:function(user, callback){

                var goodPromise = QueryService.queryServerOn('/apps/quantum/save/session').withQuantumAndWait({
                   schema:'user',
                   data:user
                });

                goodPromise.then(
                   function(successQ){
                       $log.info(successQ.messageQ);
                       callback();
                   },function(errorQ){
                       $log.error(errorQ.messageQ);
                   },function(notifyQ){
                       $log.notify(notifyQ.messageQ);
                   }
               );
            }
        };
    }]);