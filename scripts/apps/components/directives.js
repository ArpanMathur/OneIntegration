var thinkerDirectives = angular.module('centerMesh.thinkerDirectives',['centerMesh.primaryControllers']);

var rdLoading = function() {
    var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
};

var rdWidget = function() {

    var directive = {
        transclude: true,
        template: '<div class="widget" ng-transclude></div>',
        restrict: 'EA',
        scope:{},
        link:link
    };

    function link(scope, element, attrs) {

    }

    return directive;
};

var rdWidgetBody = function() {
    var directive = {
        requires: '^rdWidget',
        scope: {
            loading: '@?',
            classes: '@?'
        },
        transclude: true,
        template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
        restrict: 'E'
    };

    return directive;
};

var rdWidgetFooter = function() {
    var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
    };
    return directive;
};

var rdWidgetTitle = function() {
    var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@'
        },
        transclude: true,
        template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
        restrict: 'E'
    };

    return directive;
};

var sharesWidget = function(){

    var directive = {
        require:['^think-space', '^users'],
        restrict: 'E',
        scope:{
            plans: '=plan',
            ai: '=ai',
            portable: '=portable'
        },
        link:link(scope, element, attr, primaryControllers),
        templateUrl:'../../../views/angular/templates/directives/ShareSpace.htm'
    };

    function link(scope, element, attr, primaryControllers){
        var thinkerSocketCtrl = primaryControllers[primaryControllers.indexOf('ShareSpaceCtrl')];
        scope.canvasPerspective = Snap(element.getElementById('this_canvas'));
        thinkerSocketCtrl.initUserSpace(scope);
    }

    return directive;
};

// Initialize Angular Directives
thinkerDirectives
    .directive('rdLoading', rdLoading)
    .directive('rdWidget', rdWidget)
    .directive('rdWidgetBody', rdWidgetBody)
    .directive('rdWidgetFooter', rdWidgetFooter)
    .directive('rdWidgetHeader', rdWidgetTitle)
    .directive('shares', sharesWidget);

