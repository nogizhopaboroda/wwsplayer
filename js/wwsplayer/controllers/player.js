var wwsplayer = angular.module('wwsPlayer', ['Audio5']);

wwsplayer.controller('playerController', ['$scope', 'AudioService', function($scope, AudioService){
  $scope.source = "files/1.mp3";
  $scope.next = function(){
    $scope.source = "files/2.mp3";
  };
}]);
