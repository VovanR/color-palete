define([
    'jquery',
    'underscore',
    'backbone',
    'collections/PaletteCollection',
    'views/PaletteView',
    'views/ColorView',
    'views/PaletteAddColorView',
    'views/PaletteSelectedColorView',
], function (
    $,
    _,
    Backbone,
    PaletteCollection,
    PaletteView,
    ColorView,
    PaletteAddColorView,
    PaletteSelectedColorView
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

            var paletteCollection = new PaletteCollection(colors);
            var paletteView = new PaletteView({
                collection: paletteCollection,
            });

            var paletteAddColorView = new PaletteAddColorView({
                collection: paletteCollection,
            });

            var paletteSelectedColorView = new PaletteSelectedColorView({
                collection: paletteCollection,
            });
        },
    };

    return App;

});
