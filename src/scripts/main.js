define('jquery', [], function () { return window.jQuery; });
define('underscore', [], function () { return window._; });
define('backbone', [], function () { return window.Backbone; });
define('marionette', [], function () { return window.Marionette; });

require([
    'app',
], function (
    App
) {

    var app = new App();

});
