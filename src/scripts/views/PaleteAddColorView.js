/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PaleteAddColorTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    PaleteAddColorTemplate
) {

    'use strict';

    var PaleteAddColorView = Backbone.View.extend({
        el: '#palete-add-color-placeholder',
        template: _.template(PaleteAddColorTemplate),
        /**
         * @param {Oblect} o
         * @param {Backbone.Collection} o.collection
         */
        initialize: function (o) {
            console.info('PaleteAddColorView');
            this.collection = o.collection;
            this.render();
        },
        /**
         */
        render: function () {
            this.$el.html(this.template());
            this.$value = this.$('.js-palete-add-color__value');
        },
        events: {
            /**
             */
            'click .js-palete-add-color__button': function () {
                this._addNewColor();
            },
            /**
             */
            'keyup .js-palete-add-color__value': function (e) {
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

    return PaleteAddColorView;

});
