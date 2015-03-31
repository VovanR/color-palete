/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'handlebars',
    'text!templates/PaletteEditColorTemplate.tpl',
    'tinycolor',
], function (
    $,
    _,
    Backbone,
    Handlebars,
    PaletteEditColorTemplate,
    tinycolor
) {

    'use strict';

    var PaletteEditColorView = Backbone.View.extend({
        tagName: 'div',
        template: Handlebars.compile(PaletteEditColorTemplate),

        /**
         * @param {Oblect} o Options
         * @param {Backbone.Model} o.model
         */
        initialize: function (o) {
            console.info('PaletteEditColorView');
            this.model = o.model;
        },

        /**
         * @return {PaletteEditColorView}
         */
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$value = this.$('.js-palette-edit-color__value');
            this.$name = this.$('.js-palette-edit-color__name');

            return this;
        },

        events: {
            /**
             */
            'submit form': function (e) {
                e.preventDefault();
                this._editColor();
            },

            /**
             */
            'keyup .js-palette-edit-color__value': function () {
                this._updateBackBackground();
            },
        },

        /**
         * @private
         */
        _updateBackBackground: function () {
            var value = tinycolor(this._getValue());
            var $back = this.$('.palette-edit-color');
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
        _editColor: function () {
            var value = tinycolor(this._getValue());
            if (!value.isValid()) {
                console.error('Value is not valid');
                return;
            }
            this.model.set('value', value.toHexString());
            this.model.set('name', this._getName());
            this.model.set('editMode', false);
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

        /**
         */
        destroy: function () {
            this.remove();
            this.unbind();
        },
    });

    return PaletteEditColorView;

});
