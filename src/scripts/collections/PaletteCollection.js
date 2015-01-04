/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/ColorModel',
], function (
    $,
    _,
    Backbone,
    ColorModel
) {

    'use strict';

    var PaletteCollection = Backbone.Collection.extend({
        model: ColorModel,
    });

    return PaletteCollection;

});
