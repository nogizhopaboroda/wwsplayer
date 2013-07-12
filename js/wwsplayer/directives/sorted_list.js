wwsplayer.directive('sortedList', function(){
  return {
    restrict: 'EA',
    scope: {
      'items': '=items',
      'fields': '=fields'
    },
    template: '' +
      '<div class="sorted_list" ng-transclude>' +
        '<table class="sorted_list__table">' +
          '<tr class="sorted_list__table_row sorted_list__table_head_row">' +
            '<th class="sorted_list__table_ceil sorted_list__table_head_ceil" ng-class="field.orderClass" ng-click="sort()" ng-repeat="field in fields">{{field.label}}</th>' +
          '</tr>' +
          '<tr class="sorted_list__table_row" ng-click="onRowClick()" ng-dblclick="onRowDblClick()" ng-repeat="item in items | orderBy:orderField(item, items):orderState | filter:decorateItems">' +
            '<td class="sorted_list__table_ceil" ng-click="onItemClick(item[f.name])" ng-dblclick="onItemDblClick()" ng-show="item.visible" ng-repeat="f in fields">{{item[f.name]}}</td>' +
          '</tr>' +
        '</table>' +
      '</div>',
    replace: true,
    transclude: true,
    controller: function($scope, $element, $attrs, $transclude) {

      var __prev;
      $scope.decorateItems = function(item){
        if(angular.isUndefined(item.$$hashKey)) return item;
        if(__prev){
          item.__prevItem = __prev;
          __prev.__nextItem = item;
        }
        __prev = item;
        return item;
      };

      $scope.sort = function(){
        var self = this;
        $scope.orderField = function(item, items){
          return self.field.name;
        };
        if ($scope.orderState === false) {
          $scope.orderState = true;
          this.field.orderClass = 'desc';
        } else {
          $scope.orderState = false;
          this.field.orderClass = 'asc';
        }
      };

      var events = ['RowClick', 'RowDblClick', 'ItemClick', 'ItemDblClick'];

      angular.forEach(events, function(eventName){
        $scope['on' + eventName] = function(){
          $scope.$emit('sortedList:' + eventName, this, arguments);
        };
      });

      if ($attrs.editable) {
        var another = true;
        $scope.$on('sortedList:ItemClick', function(event, instance){
          if(!instance.item.clicked) {
            //console.log(1);
            another = another ? false : true;
            instance.item.clicked = true;
          } else if (instance.item.clicked && another) {
            console.log(another);
          } else if (instance.item.clicked && !another) {
            console.log('edit here', instance.item);
            instance.item.clicked = false;
            another = true;
          }
        });
      }

      $scope.$on('sortedList:RowClick', function(event, item){
      });
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
