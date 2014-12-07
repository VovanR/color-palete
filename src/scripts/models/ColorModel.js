/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
], function (
    $,
    _,
    Backbone,
    Marionette
) {

    'use strict';

    var ColorModel = Backbone.Model.extend({
        defaults: {
            name: null,
            value: '#fff',
        },
    });

    return ColorModel;

});
