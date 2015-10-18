/**
 * @module ColorModel
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
	'jquery',
	'lodash',
	'backbone'
], function (
	$,
	_,
	Backbone
) {
	'use strict';

	/**
	* @alias module:ColorModel
	*/
	var ColorModel = Backbone.Model.extend({
		defaults: {
			name: null,
			value: '#fff',
			selected: false,
			hovered: false,
			editMode: false
		},

		/**
		* @param {Object} o
		*/
		initialize: function (o) {
			if (!o.name) {
				this.set('name', o.value);
			}
		},

		/**
		*/
		toggle: function () {
			this.set('selected', !this.get('selected'));
		},

		/**
		*/
		deselect: function () {
			this.set('selected', false);
		}
	});

	return ColorModel;
});
