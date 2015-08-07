/**
 * @module PaletteSelectedColorView
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'handlebars',
    'text!templates/PaletteSelectedColorTemplate.tpl',
    'views/PaletteEditColorView',
], function (
    $,
    _,
    Backbone,
    Handlebars,
    PaletteSelectedColorTemplate,
    PaletteEditColorView
) {

    'use strict';

    /**
     * @alias module:PaletteSelectedColorView
     */
    var PaletteSelectedColorView = Backbone.View.extend({
        tagName: 'div',
        className: 'palette-selected-color__item',
        template: Handlebars.compile(PaletteSelectedColorTemplate),

        /**
         * @param {Oblect} o
         * @param {Backbone.Model} o.model
         */
        initialize: function (o) {
            console.info('PaletteSelectedColorView');
            this.model = o.model;
            this.listenTo(this.model, 'change:editMode', this._onEdit);
            this.listenTo(this.model, 'change:value', this.render);
            this.listenTo(this.model, 'change:name', this.render);
        },

        /**
         * @return {jQuery} $el
         */
        render: function () {
            this.model.set('editMode', false);

            this.$el.html(this.template({
                name: this.model.get('name'),
                value: this.model.get('value'),
            }));

            return this.$el;
        },

        events: {
            /**
             */
            'click .palette-selected-color__remove': function () {
                this.model.destroy();
            },

            /**
             */
            'click .palette-selected-color__edit': function () {
                this.model.set('editMode', !this.model.get('editMode'));
            },

            /**
             */
            mouseenter: function () {
                this.model.set('hovered', true);
            },

            /**
             */
            mouseleave: function () {
                this.model.set('hovered', false);
            },
        },

        /**
         * @private
         */
        _onEdit: function () {
            var editMode = this.model.get('editMode');
            this.$el.toggleClass('palette-selected-color__item_mode_edit', editMode);

            if (editMode) {
                this._openEditPanel();
            } else {
                this._closeEditPanel();
            }
        },

        /**
         * @private
         */
        _openEditPanel: function () {
            this._editPanel = new PaletteEditColorView({
                model: this.model,
            });
            this.$el.append(this._editPanel.render().$el);
        },

        /**
         * @private
         */
        _closeEditPanel: function () {
            if (!this._editPanel) {
                return;
            }
            this._editPanel.destroy();
            this._editPanel = null;
        },
    });

    return PaletteSelectedColorView;

});
