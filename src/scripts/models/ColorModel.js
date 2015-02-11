/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
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
            selected: false,
            hovered: false,
        },
        /**
         * @param {Object} o
         */
        initialize: function (o) {
            if (!o.name) {
                this.set('name', o.value);
            }
        },

        /**
         */
        toggle: function () {
            this.set('selected', !this.get('selected'));
        },

        /**
         */
        deselect: function () {
            this.set('selected', false);
        },
    });

    return ColorModel;

});
