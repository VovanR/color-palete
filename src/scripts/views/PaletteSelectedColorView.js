/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'handlebars',
    'text!templates/PaletteSelectedColorTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    Handlebars,
    PaletteSelectedColorTemplate
) {

    'use strict';

    var PaletteSelectedColorView = Backbone.View.extend({
        tagName: 'div',
        className: 'b-palette-selected-color__item',
        template: Handlebars.compile(PaletteSelectedColorTemplate),

        /**
         * @param {Oblect} o
         * @param {Backbone.Model} o.model
         */
        initialize: function (o) {
            console.info('PaletteSelectedColorView');
            this.model = o.model;
            this.listenTo(this.model, 'change:editMode', this._onEdit);
        },

        /**
         * @return {jQuery} $el
         */
        render: function () {
            this.$el.prop('tabindex', 0);
            this.$el.html(this.template({
                name: this.model.get('name'),
                value: this.model.get('value'),
            }));

            return this.$el;
        },

        events: {
            /**
             */
            'click .b-palette-selected-color__remove': function () {
                this.model.destroy();
            },

            /**
             */
            'focus': function () {
                this.model.set('editMode', true);
            },

            /**
             */
            'blur': function () {
                this.model.set('editMode', false);
            },

            /**
             */
            'mouseenter': function () {
                this.model.set('hovered', true);
            },

            /**
             */
            'mouseleave': function () {
                this.model.set('hovered', false);
            },
        },

        /**
         * @private
         */
        _onEdit: function () {
            this.$el.toggleClass('b-palette-selected-color__item_mode_edit', this.model.get('editMode'));
        },
    });

    return PaletteSelectedColorView;

});
