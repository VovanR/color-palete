/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'handlebars',
    'text!templates/PaletteAddColorTemplate.tpl',
    'tinycolor',
], function (
    $,
    _,
    Backbone,
    Handlebars,
    PaletteAddColorTemplate,
    tinycolor
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

            /**
             */
            'keyup .js-palette-add-color__value': function () {
                this._updateBackBackground();
            },
        },

        /**
         * @private
         */
        _updateBackBackground: function () {
            var value = tinycolor(this._getValue());
            var $back = this.$el.parent();
            var color = 'transparent';

            if (value.isValid()) {
                color = value.toHexString();
            }

            $back.css({
                backgroundColor: color,
            });
        },

        /**
         * @private
         */
        _addNewColor: function () {
            var value = tinycolor(this._getValue());
            if (!value.isValid()) {
                console.error('Value is not valid');
                return;
            }
            this.collection.add({
                value: value.toHexString(),
                name: this._getName(),
            });
            this.$value.val('');
            this.$name.val('');
            this._updateBackBackground();
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
