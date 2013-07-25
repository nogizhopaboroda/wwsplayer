wwsplayer.directive('fileLoad', function(){
  return {
    restrict: 'EA',
    template: '' +
      '<div class="add_file_block">' +
        '<span>drop your files <strong>or iTunesMedia list</strong> here or just click to select</span>' +
        '<input class="add_file_input" type="file" name="files[]" multiple/>' +
      '</div>',
    replace: true,
    transclude: true,
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
