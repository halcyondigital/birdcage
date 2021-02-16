(function () {
    'use strict';
  
    // Put here your custom JavaScript code.
    console.log ("Hello World");



})();
  
(($, Drupal, drupalSettings) => {
    Drupal.behaviors.assetTracker = {
      attach: function attach() {
        const path = drupalSettings.path.currentPath;
        alert("hello");
        var el = $('.view-asset-list').find('.view-content');
        $(el).each(function (i,e) {
            var sortable = Sortable.create(e, {
                animation: 150,
                handle: '.drag-handle'
            });
        })
      }
    }
})(jQuery, Drupal, drupalSettings);
