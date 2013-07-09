var wwsplayer = angular.module('wwsPlayer', ['Audio5']);

wwsplayer.controller('playerController', ['$scope', 'AudioService', function($scope, AudioService){
  $scope.source = "files/1.mp3";
  $scope.next = function(){
    $scope.source = "files/2.mp3";
  };
}]);

wwsplayer.directive('player', function(AudioService){
  return {
    restrict: 'EA',
    scope: {
      'src': '=source'
    },
    link: function(scope, element, attributes){

      scope.player = AudioService;

      //example of event binding
      scope.player.on('timeupdate',function(time, duration){
        scope.$apply(function(){
          scope.position = time;
          scope.duration = duration;
        });
      });

      scope.$watch('src', function(new_value, old_value){
        //Load the song, every event, class method and Instance attribute from audio5js are accessible from the template
        scope.player.load(new_value);
      });
    }
  }
});
