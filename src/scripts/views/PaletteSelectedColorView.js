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
        tagName: 'div',
        className: 'b-palette-selected-color__item',
        template: _.template(PaletteSelectedColorTemplate),
        /**
         * @param {Oblect} o
         * @param {Backbone.Model} o.model
         */
        initialize: function (o) {
            console.info('PaletteSelectedColorView');
            this.model = o.model;
        },
        /**
         */
        render: function () {
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
        },
    });

    return PaletteSelectedColorView;

});
