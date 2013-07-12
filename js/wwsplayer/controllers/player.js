var wwsplayer = angular.module('wwsPlayer', ['Audio5']);

wwsplayer.controller('playerController', ['$scope', '$timeout', function($scope, $timeout){

  var DELAY = 500, delayer;

  $scope.fields = [
    {
      "name": "songer",
      "label": "songer",
      "searchable": true
    },
    {
      "name": "song",
      "label": "song",
      "searchable": true
    },
    {
      "name": "album",
      "label": "album"
    }
  ];
  $scope.songs = [
    {
      "songer": "Someone",
      "song": "Any song",
      "album": "BlaBlaBla",
      "src": "files/1.mp3",
      "cover": "img/cover.png",
      "visible": true
    }
  ];

  $scope.currentSong = $scope.songs[0];

  $scope.nextSong = function(){
    $scope.currentSong = $scope.currentSong.__nextItem;
  };

  $scope.prevSong = function(){
    $scope.currentSong = $scope.currentSong.__prevItem;
  };

  $scope.$watch('search', function(nv, ov){
    if (angular.isUndefined(nv)) return;
    $timeout.cancel(delayer);
    delayer = $timeout(function(){
      $scope.$broadcast('search:start', nv, ov);
    }, DELAY);
  });

  $scope.$on('sortedList:RowDblClick', function(event, song){
    $scope.play = false;
    $scope.source = song.item.src;
    $scope.currentSong = song.item;
    $scope.currentSong.cover = $scope.currentSong.cover || 'img/no_cover.png';
    $timeout(function(){
      $scope.play = true;
    }, 10);
  });

  $scope.$on('sortedList:RowClick', function(event, song){
    //console.log('test: ', song, song.$index, song.$$nextSibling.$index)
  });
}]);
