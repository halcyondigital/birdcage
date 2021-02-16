(($, Drupal, drupalSettings) => {
    Drupal.behaviors.assetTracker = {
      attach: function attach() {
        const path = drupalSettings.path.currentPath;
        alert("hello");
      }
    }
})(jQuery, Drupal, drupalSettings);
  