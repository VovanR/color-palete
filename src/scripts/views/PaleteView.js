/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/ColorView',
    'text!templates/PaleteTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    ColorView,
    PaleteTemplate
) {

    'use strict';

    var PaleteView = Backbone.View.extend({
        el: '#palete-placeholder',
        template: _.template(PaleteTemplate),
        /**
         * @param {Oblect} o
         * @param {Backbone.Collection} o.collection
         */
        initialize: function (o) {
            console.info('PaleteView');
            this.collection = o.collection;

            this.listenTo(this.collection, 'add', this._onAdd);
            this.render();
            this.collection.each(this._onAdd);
        },
        /**
         */
        render: function () {
            this.$el.html(this.template());
        },
        /**
         * @param {Backbone.Model} model
         * @private
         */
        _onAdd: function (model) {
            var colorView = new ColorView({
                model: model,
            });
            this.$('.js-palete').append(colorView.render());

        },
    });

    return PaleteView;

});
