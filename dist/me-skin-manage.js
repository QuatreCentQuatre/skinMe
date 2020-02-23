'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SkinManager = function () {
	function SkinManager(options) {
		_classCallCheck(this, SkinManager);

		this.name = "SkinManager";
		this.fields = [];
		this.options = options;
		this.newFields = [];
	}

	_createClass(SkinManager, [{
		key: 'initFields',
		value: function initFields() {
			var $root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jQuery('html');

			this.clearFields();

			var fields = $root.find('[me\\:skin]');
			this.newFields = [];

			for (var i = 0; i < fields.length; i++) {
				this.addField(jQuery(fields[i]));
			}

			// /* Initialize all new fields*/
			for (var j = 0; j < this._newFields.length; j++) {
				this.newFields[j].initialize();
			}
		}
	}, {
		key: 'getField',
		value: function getField($field) {
			for (var i in this.fields) {
				var field = this.fields[i];

				if (field.ID === $field.attr('id')) {
					return field;
				}
			}
		}
	}, {
		key: 'addField',
		value: function addField($field) {
			var shouldInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var fieldType = $field.attr('me:skin');
			var fieldParams = { field: $field[0], type: fieldType };
			var className = 'Skin' + fieldType.charAt(0).toUpperCase() + fieldType.slice(1);

			/* Look if the field is valid */
			if (typeof Me.skinTypes[className] !== "function") {
				console.error('The skin type ' + className + ' does not exist. Please select one listed in the following array', Object.keys(Me.skinTypes));
				return;
			}

			/* Look if the field has already been rendered */
			if ($field.attr('me:skin:render')) {
				return;
			}

			/* Create instance of the field */
			var field = new Me.skinTypes[className](fieldParams);

			/* Keep reference of the global field in this class */
			this.fields.push(field);

			/* Assign the field in an array to initialize them later */
			this.newFields.push(field);

			if (shouldInit) {
				field.initialize();
			}
		}
	}, {
		key: 'clearFields',
		value: function clearFields() {
			var activeFields = [];
			for (var i in this.fields) {
				var field = this.fields[i];

				if (_typeof(field.$el) == "object") {
					var selector = jQuery('html').find(field.$el[0]);

					if (selector.length > 0) {
						activeFields.push(field);
					} else {
						field.terminate();
					}
				}
			}

			this.fields = activeFields;
		}
	}, {
		key: 'name',
		get: function get() {
			return this._name;
		},
		set: function set(name) {
			this._name = name;
		}
	}, {
		key: 'options',
		set: function set(params) {
			this._options = params;
		},
		get: function get() {
			return this._options;
		}
	}, {
		key: 'newFields',
		get: function get() {
			return this._newFields;
		},
		set: function set(newFields) {
			this._newFields = newFields;
		}
	}, {
		key: 'fields',
		get: function get() {
			return this._fields;
		},
		set: function set(fields) {
			this._fields = fields;
		}
	}]);

	return SkinManager;
}();

if (!window.Me) {
	window.Me = {};
}

if (!window.Me.skinType) {
	Me.skinTypes = [];
}

Me.skin = new SkinManager();

jQuery(document).ready(function () {
	Me.skin.initFields();
});
//# sourceMappingURL=me-skin-manage.js.map
