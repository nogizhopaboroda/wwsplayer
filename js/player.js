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
      'src': '@source'
    },
    template: '' +
      '<div ng-transclude>' +
        '<button ng-click="player.playPause()">play/pause</button>' +
        '<button ng-click="player.reset()">stop</button>' +
        '<div>position: {{position}}</div>' +
        '<div>duration: {{duration}}</div>'+
      '</div>',
    replace: true,
    transclude: true,
    controller: function($scope, $element, $attrs, $transclude) {
      $scope.player = AudioService;

      //example of event binding
      $scope.player.on('timeupdate',function(time, duration){
        $scope.$apply(function(){
          $scope.position = time;
          $scope.duration = duration;
        });
      });

      $scope.$watch('src', function(new_value, old_value){
        console.log('nv: ', new_value);
        //Load the song, every event, class method and Instance attribute from audio5js are accessible from the template
        $scope.player.load(new_value);
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
