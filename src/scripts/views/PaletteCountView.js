/**
 * @module PaletteCountView
 * @author Vladimir Rodkin <mail@vovanr.com>
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

    /**
     * @alias module:PaletteCountView
     */
    var PaletteCountView = Backbone.View.extend({
        el: '#palette-count',

        /**
         * @param {Oblect} o Options
         * @param {Backbone.Collection} o.collection
         */
        initialize: function (o) {
            console.info('PaletteCountView');
            this.collection = o.collection;
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            this.render();
        },

        /**
         */
        render: function () {
            this.$el.text(this.collection.length);
        },
    });

    return PaletteCountView;

});
