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
        template: _.template(PaletteSelectedColorTemplate),
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
            this.$el.html(this.template());
            this.$value = this.$('.js-palette-add-color__value');
        },
        /**
         * @private
         */
        _update: function () {
            var selected = this.collection.where({
                selected: true,
            });
            var log = '';
            _.each(selected, function (model) {
                log += model.get('name') || model.get('value');
            });
            this.$('.js-palette-selected-color__value').text(log);
        },
    });

    return PaletteSelectedColorView;

});
