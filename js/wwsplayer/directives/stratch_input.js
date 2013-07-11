wwsplayer.directive('stretchInput', function(){
  return {
    restrict: 'EA',
    controller: function($scope, $element, $attrs, $transclude) {
      $scope.$watch($attrs.ngModel, function(nv, ov){
        //
      });
    },
    link: function(scope, element, attributes){

      var start_params = {
        width: parseInt(element.css('width'), 10) || element[0].clientWidth,
        height: parseInt(element.css('height'), 10) || element[0].clientHeight,
        fontSize: parseInt(element.css('fontSize'), 10) || 11
      };
      var offset = {
        width: start_params.width,
        fontSize: start_params.fontSize
      };
      element.bind('keydown', function(){
        if (element.val().length >= 18) {
          element.css('width', (offset.width+=3) + 'px');
        }
        if (element.val().length === 25) {
          element.css('fontSize', (offset.fontSize-=1) + 'px');
          console.log(start_params, offset);
        }
      });
    }
  }
});
