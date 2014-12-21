define([
    'jquery',
    'underscore',
    'backbone',
    'collections/PaleteCollection',
    'views/PaleteView',
    'views/ColorView',
    'models/ColorModel',
], function (
    $,
    _,
    Backbone,
    PaleteCollection,
    PaleteView,
    ColorView,
    ColorModel
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
            ];

            paleteCollection.add(colors);
        },
    };

    return App;

});
