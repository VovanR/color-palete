/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/ColorModel',
    'text!templates/ColorTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    ColorModel,
    ColorTemplate
) {

    'use strict';

    var ColorView = Backbone.View.extend({
        template: _.template(ColorTemplate),
        /**
         * @param {Backbone.Model} model
         */
        initialize: function (model) {
            this.model = model;
        },
        /**
         * @return {jQuery}
         */
        render: function () {
            return this.template(this.model.toJSON());
        },
    });

    return ColorView;

});
