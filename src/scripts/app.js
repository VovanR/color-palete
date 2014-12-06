define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/test.tpl',
], function (
    $,
    _,
    Backbone,
    Marionette,
    testTemplate
) {

    var App = Marionette.Application.extend({
        initialize: function () {
            $('#message-placeholder').html(_.template(testTemplate)({
                message: 'From App',
            }));
        },
        navigate: function (route, options) {
            Backbone.history.navigate(route, options || {});
        },
        getCurrentRoute: function () {
            return Backbone.history.fragment;
        },
    });

    return App;

});
