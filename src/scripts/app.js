define([
    'jquery',
    'underscore',
    'backbone',
    'collections/PaleteCollection',
    'views/PaleteView',
    'views/ColorView',
    'views/PaleteAddColorView',
    'views/PaleteSelectedColorView',
], function (
    $,
    _,
    Backbone,
    PaleteCollection,
    PaleteView,
    ColorView,
    PaleteAddColorView,
    PaleteSelectedColorView
) {

    /**
     */
    var App = function () {
        this._init();
    };

    App.prototype = {
        /**
         * @private
         */
        _init: function () {
            var colors = [
                {
                    value: 'red',
                },
                {
                    value: 'green',
                },
                {
                    value: 'blue',
                },
                {
                    value: 'lime',
                },
                {
                    value: 'yellow',
                },
                {
                    value: 'pink',
                },
                {
                    value: 'brown',
                },
                {
                    value: 'orange',
                },
                {
                    value: 'purple',
                },
                {
                    value: 'black',
                },
                {
                    value: 'aqua',
                },
            ];

            var paleteCollection = new PaleteCollection(colors);
            var paleteView = new PaleteView({
                collection: paleteCollection,
            });

            var paleteAddColorView = new PaleteAddColorView({
                collection: paleteCollection,
            });

            var paleteSelectedColorView = new PaleteSelectedColorView({
                collection: paleteCollection,
            });
        },
    };

    return App;

});
