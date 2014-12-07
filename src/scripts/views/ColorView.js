/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'models/ColorModel',
    'text!templates/ColorTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    Marionette,
    ColorModel,
    ColorTemplate
) {

    'use strict';

    var ColorView = Marionette.ItemView.extend({
        template: _.template(ColorTemplate),
    });

    return ColorView;

});
