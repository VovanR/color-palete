/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/ColorModel',
], function (
    $,
    _,
    Backbone,
    ColorModel
) {

    'use strict';

    var PaletteCollection = Backbone.Collection.extend({
        model: ColorModel,
        _singleSelection: true,

        /**
         */
        initialize: function () {
            if (this._singleSelection) {
                this.listenTo(
                    this,
                    'change:selected',
                    this._deselectOther
                );
            }
        },

        /**
         * @param {Backbone.Model} selectedItem
         * @private
         */
        _deselectOther: function (selectedItem) {
            if (selectedItem.get('selected')) {
                _.invoke(this.without(selectedItem), 'deselect');
            }
        },
    });

    return PaletteCollection;

});
