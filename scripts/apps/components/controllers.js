/**
 * Created by spatialx on 8/23/15.
 */
var primaryControllers = angular.module('centerMesh.primaryControllers',[]);

var mobileView = 992;  //Need to fetch from firebase later dynamically

primaryControllers.controller('QuantumSignUpCtr',['$scope','$location','$window','$timeout','SignUpService',
    function($scope, $location, $window, $timeout,SignUpService){
        $scope.user = {};
        $scope.user.name = '';
        $scope.user.phone = '';
        $scope.user.address = '';
        $scope.user.email = '';
        $scope.$emit('DOMLoaded');
        if($location.search('user') == 'invalid'){
            $scope.messages.push({
                type:'danger',
                msg : 'Oops!! incorrect sign in at Google! Try again??'
            });
        }

        $scope.signUpPopup = function($event, strategy){
            $scope.$emit('DOMLoading');
            //$timeout.delay('5s');
            SignUpService.registerUser($scope.user,function(){
                //$scope.$emit('DOMLoaded');
                $location.path('/auth/'+strategy);
                $window.location.href = $location.absUrl();
            });
        }
    }
]);

primaryControllers.controller('MessageCTRL',['$scope', '$mdToast', '$document',
    function($scope, $mdToast, $document) {
        $scope.alerts = [{
            type: 'SUCCESS',
            msg: 'This is a material toast!'
        }, {
            type: 'DANGER',
            msg: 'This is a buggy toast!'
        }];

        $scope.closeToast = function(){
          $mdToast.hide();
        };

        $scope.showActionToast = function() {

            var toast = $mdToast.simple()
                .content($scope.alerts.msg[0])
                .action('OK');

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                   $mdToast.hide();
                }
            });
        };

        $document.on('ready',function(){
            $scope.showActionToast();
        });

        $scope.changeOfAlerts = function(){
          return $scope.alerts.length;
        };

        $scope.addAlert = function(message,type) {
            $scope.alerts.push({
                type:type?type:'',
                msg: message?message:''
            });
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }
]);

primaryControllers.controller('DashboardCTRL',['$scope','$state','$location','$cookieStore','$window',
    function($scope, $state, $location, $cookieStore, $window) {
        $scope.selected = [];
        $scope.$emit('DOMLoaded');
    }
])

primaryControllers.controller('ProfileCTRL',['$scope', '$state','$location','$cookieStore','$window',
    function($scope, $state, $location, $cookieStore, $window) {

    }
]);

primaryControllers.controller('AccountsCTRL',['$scope', '$state','$location','$cookieStore','$timeout','$window',
    function($scope, $state, $location, $cookieStore, $timeout, $window){
        $scope.$emit('DOMLoading');
        $state.go('mesh.accounts.dashboard',$state.params,{inherit:true});

        var window = angular.element($window);
        //$timeout.delay('5s');

        $scope.user = $location.search('user_id');

        $scope.getWidth = function() {
            return window.innerWidth;
        };

        $scope.$watch($scope.getWidth, function(newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });

        $scope.navBoxToggle = false;

        $scope.getWindowScroll = function(){
            return $window.scrollY;
        };

        $scope.$watch($scope.getWindowScroll,function(newValue, oldValue){
            if(newValue > 0){
                $scope.navBoxToggle = true;
            }else{
                $scope.navBoxToggle = false;
            }
        });

        $scope.toggleSidebar = function() {
            $scope.toggle = !$scope.toggle;
            $cookieStore.put('toggle', $scope.toggle);
        };

        window.bind('resize, scroll', function() {
            $scope.$apply();
        });

    }
]);

primaryControllers.controller('PrimaryAppController',['$state','$scope', '$routeParams', '$http',
    function($state, $scope, $routeParams, $http){
        $scope.spinner = {show:true};
        $scope.$on('DOMLoaded',function(){
            $scope.spinner.show = false;
        });
        $scope.$on('DOMLoading', function(){
            $scope.spinner.show = true;
        });
        $state.go('shell.login',$state.params,{inherit:true});
    }
]);

primaryControllers.controller('CenterMeshController',['$state','$scope', '$routeParams', '$http',
    function($state, $scope, $routeParams, $http){
        $scope.spinner = {show:true};
        $scope.$on('DOMLoaded',function(){
            $scope.spinner.show = false;
        });
        $scope.$on('DOMLoading', function(){
            $scope.spinner.show = true;
        });
        $state.go('mesh.accounts',$state.params,{inherit:true});
    }
]);

primaryControllers.controller('WebSockCtrl',['$scope', function($scope){
    var socket = io();
    $scope.characters = '';
    $scope.chats = '';
    $scope.connections = [];
    $scope.new_connection_update = false;
    $scope.user_status = false;
    $scope.socket = socket;
    $scope.new_user_update = function(){
        $scope.new_connection_update = !$scope.new_connection_update;
    };
    $scope.user_status_update = function(){
        $scope.user_status = !$scope.user_status;
    };

    socket.on('characters',function(connection){
        $scope.$apply(function(){
            if(connection.thinker == ''){
                $scope.notrequiredfix = true;
            }else{
                $scope.notrequiredfix = false;
            }
            $scope.connections[parseInt(connection.count)] = connection;
            $scope.user_status_update();
        });
    });

    socket.on('connections', function(connections){
        $scope.$apply(function(){
            $scope.userinfos = connections;
            $scope.new_user_update();
        });
    });

    $scope.doneTypingMessage = function($event){
        if($event.which == 13){
            $scope.chats = "";
        }else {
            socket.emit('characters', $scope.chats);
        }
    }

}]);

primaryControllers.controller('shareSpaceCtrl',
    ['$scope', function($scope){
        $scope.user_plan = 'PlanLess';
        $scope.use_ai = false;
        $scope.importable_module = false;
        $scope.socket = io();

        $scope.executeWorkFlow = function($event){

        }

        $scope.initUserSpace = function(attributes){
            $scope.primary_attributes = attributes;
            $scope.user_canvas = attributes.canvasPerspective;
            $scope.user_plan = attributes.plans;
            $scope.use_ai = attributes.ai;
            $scope.importable_module = attributes.portable;
            $scope.pingBackData = {};
            $scope.currentUsersMap = { type: {}, ai_based:{},thinkerSpaces:[]};
            $scope.thinkerSpaces = {};
            $scope.mapReducedArrayOfThinkers = [];
            $scope.mapReducedArrayOfInterests = [];
            $scope.mapReducedArrayOfInteractivity = [];
            $scope.canvasMap = {};
            $scope.socket.on('PingBack',function(pingBackData){
                $scope.$apply(function(){
                    $scope.pingBackData = pingBackData;
                    $scope.socket.emit('ProfileParameters',function(){
                        return $scope.primary_attributes;
                    });
                });
            });
            $scope.socket.on('CurrentUsersMap', function(currentUsersMap){
                $scope.$apply(function(){
                    $scope.currentUsersMap = currentUsersMap;
                    $scope.thinkerSpaces = currentUsersMap.thinkerSpaces;
                    $scope.thinkerSpaces.forEach(function(thinkerSpace){
                        var reducedMapOfThinkers = {};
                        this.thinkerSpace = thinkerSpace;
                        this.thinkerSpace.thinkersName = thinkerSpace.thinkersName;
                        this.thinkerSpace.interests = thinkerSpace.interests;
                        this.thinkerSpace.thinkerId = thinkerSpace.thinkerId;
                        this.thinkerSpace.interactivityMap = thinkerSpace.interactivityMap;
                        this.thinkerSpace.currentCanvas = thinkerSpace.currentCanvas;
                        this.thinkerSpace.userId = thinkerSpace.userId;
                        $scope.canvasMap[this.thinkerSpace.userId] = this.thinkerSpace.currentCanvas;
                        this.thinkerSpace.interactivityMap.forEach(function(interactivity){
                            this.interactiveComponent = interactivity.interactiveComponent;
                            this.componentTitle = interactivity.componentTitle;
                            this.eventMap = interactivity.eventMap;
                            this.eventMap.forEach(function(event){
                                this.event = event;
                                this.event.type = event.type;
                                this.event.workflow = event.workflow;
                            });
                            $scope.mapReducedArrayOfInteractivity.push(this.interactiveComponent);
                        });
                        this.thinkerSpace.interests.forEach(function(interest){
                            this.reducedMapOfInterests = {};
                            this.interest = interest;
                            this.interest.grade = interest.grade;
                            this.interest.quality = interest.quality;
                            this.interest.name = interest.subject;
                            this.interest.evolution = interest.evolution;
                            this.reducedMapOfInterests[thinkerSpace.thinkerId] = this.interest;
                            $scope.mapReducedArrayOfInterests.push(this.reducedMapOfInterests);
                        });
                        reducedMapOfThinkers[thinkerSpace.thinkerId] = this.thinkerSpace;
                        $scope.mapReducedArrayOfThinkers.push(reducedMapOfThinkers);
                    });
                    $scope.socket.emit('WorkspaceInitDone',function(){
                        return $scope.user_canvas;
                    });
                });
            });
            $scope.socket.on('updateCanvas',function(canvasMap){
                $scope.$apply(['$sce',function($sce){
                    $scope.canvasMap[canvasMap.userId] = $sce.trustAsHtml(canvasMap.user_canvas);
                }]);
            });
        }
}]);