define([
    'jquery',
    'underscore',
    'backbone',
    'collections/PaletteCollection',
    'views/PaletteView',
    'views/ColorView',
    'views/PaletteCountView',
    'views/PaletteAddColorView',
    'views/PaletteSelectedColorsView',
    'views/PaletteSelectedCountView',
    'views/PaletteMultiselectView',
], function (
    $,
    _,
    Backbone,
    PaletteCollection,
    PaletteView,
    ColorView,
    PaletteCountView,
    PaletteAddColorView,
    PaletteSelectedColorsView,
    PaletteSelectedCountView,
    PaletteMultiselectView
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

            var paletteSelectedColorsView = new PaletteSelectedColorsView({
                collection: paletteCollection,
            });

            var paletteSelectedCountView = new PaletteSelectedCountView({
                collection: paletteCollection,
            });

            var paletteMultiselectView = new PaletteMultiselectView({
                collection: paletteCollection,
            });
        },
    };

    return App;

});
