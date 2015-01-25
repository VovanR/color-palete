/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PaletteSelectedColorTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    PaletteSelectedColorTemplate
) {

    'use strict';

    var PaletteSelectedColorView = Backbone.View.extend({
        el: '#palette-selected-color-placeholder',
        className: 'b-palette-selected-color',
        /**
         * @param {Oblect} o
         * @param {Backbone.Collection} o.collection
         */
        initialize: function (o) {
            console.info('PaletteSelectedColorView');
            this.collection = o.collection;
            this.listenTo(this.collection, 'change:selected', this._update);
            this.render();
        },
        /**
         */
        render: function () {
        },

        /**
         * @private
         */
        _update: function () {
            this.$el.empty();
            var selected = this.collection.where({
                selected: true,
            });
            _.each(selected, function (model) {
                this._createItem(model);
            }, this);
        },

        /**
         * @private
         */
        _createItem: function (model) {
            this.$el.append(_.template(PaletteSelectedColorTemplate)({
                name: model.get('name'),
                value: model.get('value'),
            }));
        },
    });

    return PaletteSelectedColorView;

});
