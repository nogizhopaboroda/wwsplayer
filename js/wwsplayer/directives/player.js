wwsplayer.directive('player', function(AudioService){
  return {
    restrict: 'EA',
    scope: {
      'src': '@source',
      'play': '@play'
    },
    template: '' +
      '<div ng-transclude>' +
        '<div class="button" ng-class="playPauseButtonClass" ng-click="player.playPause()"></div>' +
        '<div class="song_line_wrapper">' +
          '<div class="position_time"><span>{{formatTime(position)}}</span></div>' +
          '<div class="song_line">' +
            '<div class="main_line">' +
              '<div class="loaded_line" ng-style="{width:loaded_width}"></div>' +
              '<div class="played_line" ng-style="{width:left}"></div>' +
              '<div ng-style="{left:left}" class="play_position"></div>' +
            '</div>' +
          '</div>'+
          '<div class="duration_time"><span>{{formatTime(duration)}}</span></div>'+
        '</div>'+
        '<div class="volume_line_wrapper" ng-slider min="0" max="1" step="0.1" ng-model="player.vol"></div>'+
        '<div class="button repeat"></div>' +
      '</div>',
    replace: true,
    transclude: true,
    controller: function($scope, $element, $attrs, $transclude) {

      $scope.formatTime = function (seconds) {
        if (angular.isUndefined(seconds)) return "00:00";
        var hours = parseInt(seconds / 3600, 10) % 24;
        var minutes = parseInt(seconds / 60, 10) % 60;
        var secs = parseInt(seconds % 60, 10);
        var result, fragment = (minutes < 10 ? "0" + minutes : minutes) + ":" + (secs  < 10 ? "0" + secs : secs);
        if (hours > 0) {
          result = (hours < 10 ? "0" + hours : hours) + ":" + fragment;
        } else {
          result = fragment;
        }
        return result;
      };

      $scope.player = AudioService;

      //example of event binding
      $scope.player.on('timeupdate',function(time, duration){
        $scope.$apply(function(){
          $scope.position = time;
          $scope.duration = duration;
          $scope.left = (time / duration * 100) + "%";
        });
      });

      $scope.player.on('progress',function(loadedPercent){
        $scope.$apply(function(){
          $scope.loaded_width = loadedPercent + "%";
        });
      });

      $scope.playPauseButtonClass = 'play';
      $scope.player.on('play', function(new_value, old_value){
        $scope.$apply(function(){
          $scope.playPauseButtonClass = 'pause';
        });
      });
      $scope.player.on('pause', function(new_value, old_value){
        $scope.$apply(function(){
          $scope.playPauseButtonClass = 'play';
        });
      });


      $scope.$watch('src', function(new_value, old_value){
        //Load the song, every event, class method and Instance attribute from audio5js are accessible from the template
        if (angular.isUndefined(new_value)) return;
        //console.log(old_value, new_value);
        if ($scope.player.playing) {
          $scope.player.stop();
          $scope.player.load(new_value);
          $scope.player.one('canplay', function(){
            $scope.player.play();
          });
          return;
        }
        $scope.player.load(new_value);
      });

      $scope.$watch('player.vol', function(nv, ov){
        //console.log('plvol: ' + nv);
        $scope.player.volume(nv);
      });

      $scope.$watch('play', function(new_value, old_value){
        //Load the song, every event, class method and Instance attribute from audio5js are accessible from the template
        if (angular.isUndefined(new_value) || new_value.length === 0 ) return;
        if((/^true$/i).test(new_value)) {
          if ($scope.player.ready) {
            $scope.player.play();
            return;
          }
          $scope.player.one('canplay', function(){
            $scope.player.play();
          });
        }
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
