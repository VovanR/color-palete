define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/PaleteView',
    'views/ColorView',
    'models/ColorModel',
], function (
    $,
    _,
    Backbone,
    Marionette,
    PaleteView,
    ColorView,
    ColorModel
) {

    var App = Marionette.Application.extend({
        /**
         */
        initialize: function () {
            var palete = new PaleteView();
            console.log(palete);
            palete.render();
            palete.collection.add(new ColorModel({
                name: 'foo',
                value: 'green',
            }));
            // $('#palete-placeholder').append(palete.render().el);
            // var color = new ColorView({
            //     model: new ColorModel({
            //         name: 'foo',
            //         value: 'red',
            //     }),
            // });
            // color.render();
            // console.log(color)
        },
        /**
         */
        navigate: function (route, options) {
            Backbone.history.navigate(route, options || {});
        },
        /**
         */
        getCurrentRoute: function () {
            return Backbone.history.fragment;
        },
    });

    return App;

});
