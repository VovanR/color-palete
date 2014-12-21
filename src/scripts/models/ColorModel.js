/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
], function (
    $,
    _,
    Backbone
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
