/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'models/ColorModel',
], function (
    $,
    _,
    Backbone,
    Marionette,
    ColorModel
) {

    'use strict';

    var Module = Backbone.Collection.extend({
        model: ColorModel,
    });

    return Module;

});
