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
        _lastSelected: null,

        /**
         */
        initialize: function () {
            this.listenTo(
                this,
                'change:selected',
                this._deselectOther
            );

            $(document)
                .on('keydown', function (e) {
                    if (e.which === 17) {
                        this._singleSelection = false;
                    }
                }.bind(this))
                .on('keyup', function (e) {
                    if (e.which === 17) {
                        this._singleSelection = true;
                    }
                }.bind(this));
        },

        /**
         * @param {Backbone.Model} selectedItem
         * @private
         */
        _deselectOther: function (selectedItem) {
            if (!this._singleSelection) {
                return;
            }

            if (!this._lastSelected) {
                this._lastSelected = selectedItem;
            }

            if (this._lastSelected.cid === selectedItem.cid) {
                // if (selectedItem.get('selected')) {
                    _.invoke(this.without(selectedItem), 'deselect');
                // }
                this._lastSelected = null;
            }
        },
    });

    return PaletteCollection;

});
