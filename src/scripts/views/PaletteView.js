/**
 * @module PaletteView
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'handlebars',
    'views/ColorView',
    'text!templates/PaletteTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    Handlebars,
    ColorView,
    PaletteTemplate
) {

    'use strict';

    /**
     * @alias module:PaletteView
     */
    var PaletteView = Backbone.View.extend({
        el: '#palette-placeholder',
        template: Handlebars.compile(PaletteTemplate),

        /**
         * @param {Oblect} o
         * @param {Backbone.Collection} o.collection
         */
        initialize: function (o) {
            console.info('PaletteView');
            this.collection = o.collection;

            this.listenTo(this.collection, 'add', this._onAdd);
            this.render();
            this.collection.each(this._onAdd);

            this._startSleepAnimation();
        },

        /**
         */
        render: function () {
            this.$el.html(this.template);
        },

        /**
         * @param {Backbone.Model} model
         * @private
         */
        _onAdd: function (model) {
            var colorView = new ColorView({
                model: model,
            });
            this.$('.js-palette').append(colorView.render());
        },

        /**
         * @private
         */
        _startSleepAnimation: function () {
            var wait = _.random(1, 10) * 100;
            setTimeout(function (that) {
                that._selectRandomColor();
                that._startSleepAnimation();
            }, wait, this);
        },

        /**
         * @private
         */
        _selectRandomColor: function () {
            var select = this.collection.sample();
            select.set('hovered', true);
            var wait = _.random(5, 50) * 100;
            setTimeout(function (that) {
                if (!select) {
                    return;
                }
                select.set('hovered', false);
            }, wait, this);
        },
    });

    return PaletteView;

});
