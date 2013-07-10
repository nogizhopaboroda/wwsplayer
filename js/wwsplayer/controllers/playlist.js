wwsplayer.controller('playlistController', ['$scope', function($scope){
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
      "songer": "songer1",
      "song": "song1",
      "album": "blabla",
      "visible": true
    },
    {
      "songer": "bla",
      "song": "test",
      "album": "blabla",
      "visible": true
    },
    {
      "songer": "songer3",
      "song": "song3",
      "album": "alb",
      "visible": true
    },
    {
      "songer": "bla",
      "song": "test",
      "album": "blabla",
      "visible": true
    }
  ];
}]);
