define([
    'jquery',
    'underscore',
    'backbone',
    'collections/PaletteCollection',
    'views/PaletteView',
    'views/ColorView',
    'views/PaletteCountView',
    'views/PaletteAddColorView',
    'views/PaletteSelectedColorView',
], function (
    $,
    _,
    Backbone,
    PaletteCollection,
    PaletteView,
    ColorView,
    PaletteCountView,
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
                {
                    name: 'fogdog',
                    value: '#f06d06',
                },
            ];

            var paletteCollection = new PaletteCollection(colors);
            var paletteView = new PaletteView({
                collection: paletteCollection,
            });

            var paletteCountView = new PaletteCountView({
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
