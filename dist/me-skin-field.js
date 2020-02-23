'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * SkinMe: A library to simplify radio, checkbox, select customization
 *
 * Author: Samuel Cléroux-Bouthillier && Nicolas Lemoyne
 * http://www.quatrecentquatre.com
 *
 * Dual licensed under MIT and GNU General Public License version 3 (GPLv3)
 * http://www.opensource.org/licenses/LGPL-3.0
 * Version: 2.0.0
 * Release date: Feb 2020
 *
 * Methods:
 *  -
 *  -
 *  -
 *  -
 *  -
 *  -
 *  -
 *
 *  -
 *  -
 *  -
 *
 *
 *  TODO
 *  - Enable / disable field
 *  - Filtering
 *  - Search
 *  - Ajax search
 *
 *
 *  DONE - radio
 * 	DONE - checkbox
 *	DONE - select
 *
 * 	<input type="range">
 * 	<input type="color">
 * 	<input type="date">
 * 	<input type="datetime-local">
 * 	<input type="email">
 * 	<input type="file">
 * 	<input type="hidden">
 * 	<input type="image">
 * 	<input type="month">
 * 	<input type="number">
 * 	<input type="password">
 * 	<input type="reset">
 * 	<input type="search">
 * 	<input type="submit">
 * 	<input type="tel">
 * 	<input type="text">
 * 	<input type="time">
 * 	<input type="url">
 * 	<input type="week">
 */

var SkinField = function () {
	function SkinField(options) {
		_classCallCheck(this, SkinField);

		this.field = options.field;
		this.$field = jQuery(options.field);

		this.ID = this.$field.attr('id');
		this.name = this.$field.attr('name');
		this.type = this.$field.attr('type') ? this.$field.attr('type') : this.$field.prop("tagName").toLowerCase();
		this.disabled = !!this.$field.attr('disabled');

		this.$label = jQuery('label[for="' + this.ID + '"]').length > 0 ? jQuery('label[for="' + this.ID + '"]') : null;
		this.$customSkin = jQuery('[me\\:skin\\:id="' + this.ID + '"]').length > 0 ? jQuery('[me\\:skin\\:id="' + this.ID + '"]') : null;

		if (!this.dependenciesExist() || !this.requirementsExist()) return;

		this.options = { debug: window.SETTINGS && SETTINGS.DEBUG_MODE ? SETTINGS.DEBUG_MODE : false };
	}

	_createClass(SkinField, [{
		key: 'initialize',
		value: function initialize() {
			// Set common variables used by every field type
			this.setDOMAttr();
			this.setCustomVariables();

			if (!this.$customSkin) return;

			this.removeCommonEvents();
			this.addCommonEvents();

			// Add specific variables depending of the field type
			this.removeCustomEvents();
			this.addCustomEvents();

			this.setDefault();
		}
	}, {
		key: 'addCommonEvents',
		value: function addCommonEvents() {
			var _this = this;

			this.$customSkin.on('mouseenter.skinMe mouseleave.skinMe', function (e) {
				_this.toggleHover(e);
			});
			this.$customSkin.on('keydown.skinMe', function (e) {
				_this.keyHandler(e);
			});
		}
	}, {
		key: 'removeCommonEvents',
		value: function removeCommonEvents() {
			this.$customSkin.off('mouseenter.skinMe mouseleave.skinMe');
			this.$customSkin.off('keydown.skinMe');
		}
	}, {
		key: 'setDOMAttr',
		value: function setDOMAttr() {
			this.$field.attr('me:skin:render', "true");
			this.$field.attr('me:skin:type', this.type);
			this.$customSkin.attr('me:skin:render', "true");
			this.$customSkin.attr('me:skin:disabled', this.disabled);

			this.$customSkin.attr('me:skin:theme', this.$field.attr('me:skin:theme'));
			this.$field.removeAttr('me:skin:theme');

			if (!this.disabled) {
				this.$customSkin.attr('tabindex', 0);
			}
		}
	}, {
		key: 'dependenciesExist',
		value: function dependenciesExist() {
			var isValid = true;

			if (!window.$) {
				console.warn('SkinMe :: Dependencies :: required jquery (http://jquery.com/)');
				isValid = false;
			}

			return isValid;
		}
	}, {
		key: 'requirementsExist',
		value: function requirementsExist() {
			var isValid = true;

			if (!this.$customSkin) {
				console.error('Skin element associated with ID:' + this.ID + ' can\'t be found. Add me:skin:id="' + this.ID + '"');
				isValid = false;
			}

			if (!this.ID) {
				console.error('ID attribute must be defined on the native field');
				isValid = false;
			}

			return isValid;
		}
	}, {
		key: 'toggleHover',
		value: function toggleHover(e) {
			if (this.$field.attr('disabled')) {
				return;
			}
			this.$customSkin.toggleClass('hover');
		}
	}, {
		key: 'setCustomVariables',


		// Those functions need to be overwrite by each type of field
		value: function setCustomVariables() {}
	}, {
		key: 'addCustomEvents',
		value: function addCustomEvents() {}
	}, {
		key: 'removeCustomEvents',
		value: function removeCustomEvents() {}
	}, {
		key: 'setDefault',
		value: function setDefault() {}
	}, {
		key: 'keyHandler',
		value: function keyHandler(e) {}
	}, {
		key: 'name',
		get: function get() {
			return this._name;
		},
		set: function set(name) {
			if (typeof name !== "string") {
				console.error('The name parameter must be a string');
				return;
			}

			if (name) {
				this._name = name;
			}
		}
	}, {
		key: 'type',
		get: function get() {
			return this._type;
		},
		set: function set(type) {
			if (typeof type !== "string") {
				console.error('The type parameter must be a string');
				return;
			}

			if (type) {
				this._type = type;
			}
		}
	}, {
		key: 'ID',
		get: function get() {
			return this._ID;
		},
		set: function set(ID) {
			if (typeof ID !== "string") {
				console.error('The ID parameter must be a string');
				return;
			}

			if (ID) {
				this._ID = ID;
			}
		}
	}, {
		key: 'options',
		get: function get() {
			return this._options;
		},
		set: function set(params) {
			this._options = params;
		}
	}, {
		key: 'disabled',
		get: function get() {
			return this._disabled;
		},
		set: function set(bool) {
			if (typeof bool !== "boolean") {
				console.error('The bool parameter must be a boolean');
				return;
			}

			this.$field.attr('disabled', bool);
			this._disabled = bool;

			if (this.$customSkin) {
				this.$customSkin.attr('me:skin:disabled', bool);

				if (bool === true) {
					this.$customSkin.attr('tabindex', -1);
				} else {
					this.$customSkin.attr('tabindex', 0);
				}
			}
		}
	}]);

	return SkinField;
}();
//# sourceMappingURL=me-skin-field.js.map
