/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PaletteAddColorTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    PaletteAddColorTemplate
) {

    'use strict';

    var PaletteAddColorView = Backbone.View.extend({
        el: '#palette-add-color-placeholder',
        template: _.template(PaletteAddColorTemplate),
        /**
         * @param {Oblect} o
         * @param {Backbone.Collection} o.collection
         */
        initialize: function (o) {
            console.info('PaletteAddColorView');
            this.collection = o.collection;
            this.render();
        },
        /**
         */
        render: function () {
            this.$el.html(this.template());
            this.$value = this.$('.js-palette-add-color__value');
        },
        events: {
            /**
             */
            'click .js-palette-add-color__button': function () {
                this._addNewColor();
            },
            /**
             */
            'keyup .js-palette-add-color__value': function (e) {
                if (e.which === 13) {
                    this._addNewColor();
                }
            },
        },
        /**
         * @private
         */
        _addNewColor: function () {
            this.collection.add({
                value: this._getValue(),
            });
            this.$value.val('');
        },
        /**
         * @return {String}
         * @private
         */
        _getValue: function () {
            return this.$value.val().trim();
        },
    });

    return PaletteAddColorView;

});
