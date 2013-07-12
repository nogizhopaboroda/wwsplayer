wwsplayer.directive('ngDrag', function($parse){
  return {
    restrict: 'A',
    link: function(scope, element, attributes){
      element.attr('draggable', 'true');
      element.bind('dragstart', function(event){
        event.dataTransfer.setDragImage(event.target,0,100000000); //адов костыль
      });
      element.bind('drag', function(event){
        event.stopPropagation();
        event.preventDefault();
        var fn = $parse(attributes.ngDrag);
        scope.$apply(function() {
          fn(scope, {event: event});
        });
        return;
      });
    }
  };
});
