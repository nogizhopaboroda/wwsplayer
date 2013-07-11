var wwsplayer = angular.module('wwsPlayer', ['Audio5']);

wwsplayer.controller('playerController', ['$scope', '$timeout', function($scope, $timeout){

  var DELAY = 500, delayer;

  $scope.source = "files/1.mp3";
  $scope.next = function(){
    $scope.source = "files/2.mp3";
  };

  $scope.$watch('search', function(nv, ov){
    if (angular.isUndefined(nv)) return;
    $timeout.cancel(delayer);
    delayer = $timeout(function(){
      $scope.$broadcast('search:start', nv, ov);
    }, DELAY);
  });
}]);
