/*(function () {
    'use strict';
  
    // Put here your custom JavaScript code.
    console.log ("Hello World");



})();*/
  
(($, Drupal, drupalSettings) => {
    Drupal.behaviors.assetTracker = {
      attach: function attach() {
        const path = drupalSettings.path.currentPath;
        var el = $('.sortable-assets');
        $(el).each(function (i,e) {
            var sortable = Sortable.create(e, {
                animation: 150,
                group: 'assets'
            });
        })
      }
    }
})(jQuery, Drupal, drupalSettings);
