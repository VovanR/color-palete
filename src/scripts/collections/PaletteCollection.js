/**
 * @module PaletteCollection
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
	'jquery',
	'lodash',
	'backbone',
	'models/ColorModel'
], function (
	$,
	_,
	Backbone,
	ColorModel
) {
	'use strict';

	/**
	* @alias module:PaletteCollection
	*/
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
						this.toggleSingleSelectionMode(false);
					}
				}.bind(this))
				.on('keyup', function (e) {
					if (e.which === 17) {
						this.toggleSingleSelectionMode(true);
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

		/**
		* @param {Boolean} single
		*/
		toggleSingleSelectionMode: function (single) {
			this._singleSelection = single;
			Backbone.trigger('single-selection', single);
		},

		/**
		* @return {Boolean}
		*/
		getSelectionMode: function () {
			return this._singleSelection;
		}
	});

	return PaletteCollection;
});
