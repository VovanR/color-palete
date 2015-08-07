/**
 * @module ColorView
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'models/ColorModel',
], function (
    $,
    _,
    Backbone,
    ColorModel
) {

    'use strict';

    /**
     * @alias module:ColorView
     */
    var ColorView = Backbone.View.extend({
        tagName: 'span',
        className: 'palette__item',

        /**
         * @param {Oblect} o Options
         * @param {Backbone.Model} o.model
         */
        initialize: function (o) {
            this.model = o.model;
            this.listenTo(this.model, 'change:value', this.render);
            this.listenTo(this.model, 'change:name', this.render);
            this.listenTo(this.model, 'change:selected', this._onToggle);
            this.listenTo(this.model, 'change:hovered', this._onHover);
            this.listenTo(this.model, 'destroy', this.destroy);
        },

        /**
         * @return {jQuery}
         */
        render: function () {
            var block = this.$el[0];
            var color = this.model.get('value');
            block.style.backgroundColor = color;
            block.style.color = color;
            if (this.model.get('selected')) {
                this.$el.addClass('palette__item_state_selected');
            }

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
            this.$el.toggleClass('palette__item_state_selected', this.model.get('selected'));
        },

        /**
         * @private
         */
        _onHover: function () {
            this.$el.toggleClass('palette__item_state_hovered', this.model.get('hovered'));
        },

        /**
         */
        destroy: function () {
            this.undelegateEvents();
            this.remove();
        },
    });

    return ColorView;

});
