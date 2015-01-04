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
        // childView: ColorView,
        /**
         * @param {Oblect} o
         * @param {Backbone.Collection} o.model
         */
        initialize: function (o) {
            console.info('PaleteView');
            this.model = o.model;
            this.listenTo(this.model, 'add', this._onAdd);
            this.render();
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
