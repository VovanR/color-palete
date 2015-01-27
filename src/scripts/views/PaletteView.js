/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/ColorView',
    'text!templates/PaletteTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    ColorView,
    PaletteTemplate
) {

    'use strict';

    var PaletteView = Backbone.View.extend({
        el: '#palette-placeholder',
        template: _.template(PaletteTemplate),
        /**
         * @param {Oblect} o
         * @param {Backbone.Collection} o.collection
         */
        initialize: function (o) {
            console.info('PaletteView');
            this.collection = o.collection;

            this.listenTo(this.collection, 'add', this._update);
            this.listenTo(this.collection, 'destroy', this._update);
            this.render();
            this.collection.each(this._onAdd);
        },
        /**
         */
        render: function () {
            this.$el.html(this.template());
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

        _update: function () {
            this.$('.js-palette').empty();
            this.collection.each(this._onAdd);
        },
    });

    return PaletteView;

});
