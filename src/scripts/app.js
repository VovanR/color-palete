define([
    'jquery',
    'underscore',
    'backbone',
    'collections/PaleteCollection',
    'views/PaleteView',
    'views/ColorView',
    'models/ColorModel',
    'views/PaleteAddColorView',
    'views/PaleteSelectedColorView',
], function (
    $,
    _,
    Backbone,
    PaleteCollection,
    PaleteView,
    ColorView,
    ColorModel,
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
            var paleteCollection = new PaleteCollection();
            var paleteView = new PaleteView({
                model: paleteCollection,
            });
            var paleteAddColorView = new PaleteAddColorView({
                collection: paleteCollection,
            });

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

            paleteCollection.add(colors);

            var paleteSelectedColorView = new PaleteSelectedColorView({});
        },
    };

    return App;

});
