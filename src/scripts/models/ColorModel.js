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
            selected: false,
        },
        /**
         */
        toggle: function () {
            this.set('selected', !this.get('selected'));
        },
    });

    return ColorModel;

});
