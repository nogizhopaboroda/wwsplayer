wwsplayer.directive('ngSlider', function($parse, $timeout){
  return {
    restrict: 'EA',
    scope: {
      ngModel: '=',
      max: '=max',
      min: '=min',
      step: '=step'
    },
    template: '<div class="slider_wrapper" ng-transclude>' +
      '<div class="volume_line_all slider_line_all"></div>' +
      '<div class="volume_line_current slider_line_current" ng-style="{width:volume_width}"></div>' +
      '<div ng-drag="dragHandler(event)" ng-style="{left:volume_width}" class="volume_position slider_handle"></div>' +
      '</div>',
    replace: true,
    transclude: true,
    link: function(scope, element, attributes){

      var tmt, _array = [], _widths, _i = 0;
      var COUNT = 5;

      var step = parseFloat(scope.step);

      var steps_count = (scope.max - scope.min) / step;

      scope.volume_width = scope.ngModel / (scope.max - scope.min) * 100 + '%';

      scope.dragHandler = function(event){

        var parentLeft = event.target.parentNode.offsetLeft;
        var parentWidth = event.target.parentNode.offsetWidth;
        var parentRight = parentLeft + parentWidth;
        var step_duration = parentWidth / steps_count; //px

        if(event.screenX > parentLeft && event.screenX < parentRight){

          /* TODO: optimize it! */
          _i++;
          _array.push(event.screenX);

          var middle = 0;
          if(_i > COUNT) {
            _i = 0;
            (function(arr){
              var sum = 0;
              for(var j = 0; j < COUNT; j++){
                sum += _array[j];
              }

              middle = parseInt(sum / COUNT);

              var delta = middle - parentLeft;
              var dirty = parseFloat(((delta / parentWidth)*scope.max).toFixed(1));

              if(scope.ngModel + step < dirty || scope.ngModel - step > dirty){
                var reverse = scope.ngModel > dirty;
                while(true){
                  if(reverse && scope.ngModel < dirty) break;
                  if(!reverse && scope.ngModel > dirty) break;
                  scope.ngModel += step * (reverse ? -1 : 1);
                  //console.log(1, scope.ngModel);
                }
              }

              var percent = scope.ngModel / (scope.max - scope.min);
              scope.volume_width = percent * 100 + "%"; //переименовать volume_width


            })(_array);
            _array = [];
          }
        } else if (event.screenX != 0) {
          //console.log('end, ' + event.screenX, parentLeft, scope.min, scope.max);
          scope.ngModel = event.screenX < parentLeft ? scope.min : scope.max;
          var percent = scope.ngModel / (scope.max - scope.min);
          scope.volume_width = percent * 100 + "%"; //переименовать volume_width
          //console.log(2, scope.ngModel);
        }
      };
    }
  }
});
