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
         */
        initialize: function (o) {
            console.info('PaleteSelectedColorView');
            this.render();
        },
        /**
         */
        render: function () {
            this.$el.html(this.template());
            this.$value = this.$('.js-palete-add-color__value');
        },
    });

    return PaleteSelectedColorView;

});
