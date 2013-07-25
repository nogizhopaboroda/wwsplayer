/* TODO: вынести это в сервис */
window.attrs_map = {
  "Location": "src",
  "Name": "song",
  "Artist": "songer",
  "Album": "album"
};


wwsplayer.controller('playlistController', ['$scope', function($scope){


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
        if ($scope.songs[i][sf[l].name] && $scope.songs[i][sf[l].name].indexOf(value) !== -1) $scope.songs[i].visible = true;
      }
    }
  };

  $scope.addToPlaylist = function(){
    $scope.songs.push({
      "songer": "added",
      "song": "added",
      "album": "added",
      "src": $scope.newSong,
      "visible": true
    });
    $scope.newSong = "";
  };

  $scope.$watch('loaded_files', function(nv, ov){
    if(angular.isUndefined(nv)) return;

    function _arrayBufferToBase64( buffer ) {
      var binary = '';
      var bytes = new Uint8Array( buffer );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] )
      }
      return window.btoa( binary );
    }

    for (var i = 0, f; f = nv[i]; i++) {

      if (f.type.match('text/xml')) {
        var reader = new FileReader();
        reader.onload = (function(event){
          var result = event.target.result;

          /* TODO: правильные названия переменных! */

          var oParser = new DOMParser();
          var oDOM = oParser.parseFromString(result, "text/xml");

          var a = oDOM.querySelectorAll('plist > dict > dict > dict');

          for(var i = 0; i < a.length; i++){
            var f = a[i].firstChild;
            var song = {};
            while(f.nextSibling){

              var key = f.nextSibling;
              var value = key.nextSibling;

              //song[key.textContent] = value.textContent;

              if(window.attrs_map[key.textContent]){
                song[window.attrs_map[key.textContent]] = value.textContent
              }

              f = value.nextSibling;
            }
            song.visible = true;
            $scope.$apply(function(){
              $scope.songs.push(song);
            });
          }
        });
        reader.readAsText(f);
      }
      if (!f.type.match('audio.*')) {
        continue;
      }

      var reader = new FileReader();

      var url = f.urn || f.name;

      reader.onload = (function(file){
        return function(event) {
          ID3.loadTags(url, function() {
            var tags = ID3.getAllTags(url);

            var base64String = _arrayBufferToBase64(event.target.result);
            var base64Src = "data:" + file.type + ";base64," + base64String;
            var image = tags.picture;

            var new_song = {
              "songer": tags.artist,
              "song": tags.title,
              "album": tags.album,
              "src": base64Src,
              "visible": true
            };

            if (image) {
              new_song.cover = "data:" + image.format + ";base64," + Base64.encodeBytes(image.data);
            }

            $scope.$apply(function(){
              $scope.songs.push(new_song);
            });

          }, {
            tags: ["title","artist","picture","album"],
            dataReader: FileAPIReader(file)
          });
        }
      })(f);
      reader.readAsArrayBuffer(f);
    }
  });

  $scope.$on('search:start', function(event, nv, ov){
    filterSongs(nv);
  });


  $scope.$on('sortedList:ItemClick', function(event, item){
    //do smth
  });

  $scope.$on('sortedList:ItemDblClick', function(event, item){
    //do smth
  });

  $scope.$on('sortedList:RowClick', function(event, item){
    //do smth
  });

  $scope.$on('sortedList:RowDblClick', function(event, item){

  });

}]);
