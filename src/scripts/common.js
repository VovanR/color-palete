requirejs.config({
    baseUrl: '/scripts',
    paths: {
        text: '../bower_components/requirejs-text/text',

        // Apps paths
        collections: './collections',
        models: './models',
        routers: './routers',
        views: './views',
        templates: '../templates',
    },
    shim: {
    },
});

define('jquery', [], function () { return window.jQuery; });
define('underscore', [], function () { return window._; });
define('backbone', [], function () { return window.Backbone; });
define('marionette', [], function () { return window.Marionette; });
