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

    var ColorView = Backbone.View.extend({
        tagName: 'span',
        className: 'b-palette__item',

        /**
         * @param {Oblect} o Options
         * @param {Backbone.Model} o.model
         */
        initialize: function (o) {
            this.model = o.model;
            this.listenTo(this.model, 'change:selected', this._onToggle);
            this.listenTo(this.model, 'change:hovered', this._onHover);
        },

        /**
         * @return {jQuery}
         */
        render: function () {
            var block = this.$el[0];
            var color = this.model.get('value');
            block.style.backgroundColor = color;
            block.style.color = color;

            return this.$el;
        },

        events: {
            /**
             */
            click: function () {
                this.model.toggle();
            },
        },

        /**
         * @private
         */
        _onToggle: function () {
            this.$el.toggleClass('b-palette__item_state_selected', this.model.get('selected'));
        },

        /**
         * @private
         */
        _onHover: function () {
            this.$el.toggleClass('b-palette__item_state_hovered', this.model.get('hovered'));
        },
    });

    return ColorView;

});
