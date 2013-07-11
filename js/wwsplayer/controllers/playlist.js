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

  var getSearchableFields = function(){
    var fields = [];
    for(var i = 0; i < $scope.fields.length; i++){
      if($scope.fields[i].searchable) fields.push($scope.fields[i]);
    }
    return fields;
  };
  var filterSongs = function(value){
    var sf = getSearchableFields();
    for(var i = 0; i < $scope.songs.length; i++){
      $scope.songs[i].visible = false;
      for(var l = 0; l < sf.length; l++){
        if ($scope.songs[i][sf[l].name].indexOf(value) !== -1) $scope.songs[i].visible = true;
      }
    }
  };

  $scope.$on('search:start', function(event, nv, ov){
    filterSongs(nv);
  });
}]);
