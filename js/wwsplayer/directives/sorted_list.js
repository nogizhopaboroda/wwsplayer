wwsplayer.directive('sortedList', function(){
  return {
    restrict: 'EA',
    scope: {
      'items': '=items',
      'fields': '=fields'
    },
    template: '' +
      '<div ng-transclude>' +
      '<table>' +
      '<tr class="">' +
      '<th style="cursor: pointer; background: yellow;" ng-click="sort(field)" ng-repeat="field in fields">{{field.label}} {{field.orderSymbol}}</th>' +
      '</tr>' +
      '<tr class="" ng-repeat="item in items | orderBy:orderField:orderState">' +
      '<td ng-show="item.visible" ng-repeat="f in fields">{{item[f.name]}}</td>' +
      '</tr>' +
      '</table>' +
      '</div>',
    replace: true,
    transclude: true,
    controller: function($scope, $element, $attrs, $transclude) {
      $scope.sort = function(field){
        $scope.orderField = field.name;
        if ($scope.orderState === false) {
          $scope.orderState = true;
          field.orderSymbol = '▼';
        } else {
          $scope.orderState = false;
          field.orderSymbol = '▲';
        }
      }
    },
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) {
        },
        post: function postLink(scope, iElement, iAttrs, controller) {
        }
      }
    },
    link: function(scope, element, attributes){
    }
  }
});
