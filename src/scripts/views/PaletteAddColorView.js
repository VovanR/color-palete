/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/PaletteAddColorTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    Handlebars,
    PaletteAddColorTemplate
) {

    'use strict';

    var PaletteAddColorView = Backbone.View.extend({
        el: '#palette-add-color-placeholder',
        template: Handlebars.compile(PaletteAddColorTemplate),

        /**
         * @param {Oblect} o Options
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
            this.$el.html(this.template);
            this.$value = this.$('.js-palette-add-color__value');
            this.$name = this.$('.js-palette-add-color__name');
        },

        events: {
            /**
             */
            'submit form': function (e) {
                e.preventDefault();
                this._addNewColor();
            },
        },

        /**
         * @private
         */
        _addNewColor: function () {
            var value = this._getValue();
            if (!value) {
                console.error('Value is not valid');
                return;
            }
            this.collection.add({
                value: this._getValue(),
                name: this._getName(),
            });
            this.$value.val('');
            this.$name.val('');
        },

        /**
         * @return {String}
         * @private
         */
        _getValue: function () {
            return this.$value.val().trim();
        },

        /**
         * @return {String}
         * @private
         */
        _getName: function () {
            return this.$name.val().trim();
        },
    });

    return PaletteAddColorView;

});
