/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'collections/PaleteCollection',
    'views/ColorView',
    'text!templates/PaleteTemplate.tpl',
], function (
    $,
    _,
    Backbone,
    Marionette,
    PaleteCollection,
    ColorView,
    PaleteTemplate
) {

    'use strict';

    var PaleteView = Marionette.CollectionView.extend({
        el: '#palete-placeholder',
        // template: _.template(PaleteTemplate),
        tagName: 'div',
        collection: new PaleteCollection(),
        childView: ColorView,
        // childViewContainer: '.b-palete',
        // initialize: function () {
        //     console.info('PaleteView');
        //     this.render();
        // },
        // render: function () {
        //     this.$el.html(this.template());
        // },
    });

    return PaleteView;

});
