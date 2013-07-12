wwsplayer.directive('fileLoad', function(){
  return {
    restrict: 'EA',
    template: '' +
      '<div class="add_file_block">' +
        '<span>drop your files here or just click to select</span>' +
        '<input class="add_file_input" type="file" name="files[]" multiple/>' +
      '</div>',
    replace: true,
    transclude: true,
    /*controller: function($scope, $element, $attrs, $transclude) {
    },
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) {
        },
        post: function postLink(scope, iElement, iAttrs, controller) {
        }
      }
    },*/
    link: function(scope, element, attributes){


      function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        scope.$apply(function(){
          scope[attributes.ngModel] = files;
        });
      }
      element.find('input').bind('change', handleFileSelect, false);


      function handleFileOnDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.
        scope.$apply(function(){
          scope[attributes.ngModel] = files;
        });
      }

      function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
      }

      element.bind('dragover', handleDragOver, false);
      element.bind('drop', handleFileOnDrop, false);
    }
  }
});
