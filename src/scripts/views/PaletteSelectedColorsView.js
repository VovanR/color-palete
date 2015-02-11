/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/PaletteSelectedColorView',
], function (
    $,
    _,
    Backbone,
    PaletteSelectedColorView
) {

    'use strict';

    var PaletteSelectedColorsView = Backbone.View.extend({
        el: '#palette-selected-colors-placeholder',

        /**
         * @param {Oblect} o Options
         * @param {Backbone.Collection} o.collection
         */
        initialize: function (o) {
            console.info('PaletteSelectedColorsView');
            this.collection = o.collection;
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'destroy', this.render);
            this.listenTo(this.collection, 'change:selected', this.render);
            this.render();
        },

        /**
         */
        render: function () {
            this.$el.empty();
            var selected = this.collection.where({
                selected: true,
            });
            _.each(selected, function (model) {
                var selectedColor = new PaletteSelectedColorView({
                    model: model,
                });
                this.$el.append(selectedColor.render());
            }, this);
        },
    });

    return PaletteSelectedColorsView;

});
