/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PaleteSelectedColorTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    PaleteSelectedColorTemplate
) {

    'use strict';

    var PaleteSelectedColorView = Backbone.View.extend({
        el: '#palete-selected-color-placeholder',
        template: _.template(PaleteSelectedColorTemplate),
        /**
         * @param {Oblect} o
         * @param {Backbone.Collection} o.collection
         */
        initialize: function (o) {
            console.info('PaleteSelectedColorView');
            this.collection = o.collection;
            this.listenTo(this.collection, 'change:selected', this._update);
            this.render();
        },
        /**
         */
        render: function () {
            this.$el.html(this.template());
            this.$value = this.$('.js-palete-add-color__value');
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
                log += model.get('value');
            });
            this.$('.js-palete-selected-color__value').text(log);
        },
    });

    return PaleteSelectedColorView;

});
