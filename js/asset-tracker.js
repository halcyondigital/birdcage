(($, Drupal, drupalSettings) => {
    Drupal.behaviors.assetTracker = {
      attach: function attach() {
        const path = drupalSettings.path.currentPath;
        var el = $('.sortable-assets');
        $(el).each(function (i,e) {
            var sortable = Sortable.create(e, {
                animation: 150,
                group: 'assets',
                sort: false,
                onAdd: function (/**Event*/evt) {
                  var assetEl = evt.item;  // dragged HTMLElement
                  var locationEl = evt.to;    // target list
                  var assetId = $(assetEl).find('.asset-uuid').text();
                  var locationId = $(locationEl).parents('.location').data('locationUuid');
                  var asset = {
                    data: {
                      type: "node--asset",
                      id: assetId, // eg "d4fac94c-b6e1-4f99-8258-81fa6ec7e605"
                      relationships: {
                        field_location: {
                          data: {
                            type: "node--location",
                            id: locationId // eg "8bc52bfd-b1ea-4d04-b7a9-e79337aa6703"
                          }
                        }
                      }
                    }
                  };
                  getCsrfToken(function (csrfToken) {
                    updateAsset(csrfToken, asset, assetId);
                  });
                },
            });
        })

        function getCsrfToken(callback) {
          $.get(Drupal.url('session/token'))
              .done(function (data) {
                  var csrfToken = data;
                  callback(csrfToken);
              });
        }
        
        function updateAsset(csrfToken, asset, assetId) {
          $.ajax({
              url: `/jsonapi/node/asset/${assetId}`,
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/vnd.api+json',
                  'Accept': 'application/vnd.api+json',
                  'X-CSRF-Token': csrfToken
              },
              data: JSON.stringify(asset),
              success: function (asset) {
                  console.log(asset);
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                  console.log("Status: " + textStatus);
                  console.log("Error: " + errorThrown);
              }
          });
        }

      }
    }
})(jQuery, Drupal, drupalSettings);

