'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkinCheckbox = function (_SkinField) {
	_inherits(SkinCheckbox, _SkinField);

	function SkinCheckbox(options) {
		_classCallCheck(this, SkinCheckbox);

		var _this = _possibleConstructorReturn(this, (SkinCheckbox.__proto__ || Object.getPrototypeOf(SkinCheckbox)).call(this, options));

		_this.classes = {
			checked: 'is-checked'
		};
		return _this;
	}

	_createClass(SkinCheckbox, [{
		key: 'addCustomEvents',
		value: function addCustomEvents() {
			var _this2 = this;

			this.$field.on('change.skinMe', function (e) {
				_this2.changeHandler(e);
			});
			this.$customSkin.on('click.skinMe', function (e) {
				_this2.clickHandler(e);
			});

			if (this.$label) {
				this.$label.on('click.skinMe', function (e) {
					_this2.clickHandler(e);
				});
			}
		}
	}, {
		key: 'removeCustomEvents',
		value: function removeCustomEvents() {
			this.$field.off('change.skinMe');
			this.$customSkin.off('click.skinMe');

			if (this.$label) {
				this.$label.off('click.skinMe');
			}
		}
	}, {
		key: 'changeHandler',
		value: function changeHandler(e) {
			if (!this.field.checked) {
				this.$customSkin.addClass(this.classes.checked);
				this.$field.addClass(this.classes.checked);
				this.field.checked = true;
			} else {
				this.$customSkin.removeClass(this.classes.checked);
				this.$field.removeClass(this.classes.checked);
				this.field.checked = false;
			}
		}
	}, {
		key: 'clickHandler',
		value: function clickHandler(e) {
			if (this.disabled) {
				return;
			}
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			this.$field.trigger('change');
		}
	}, {
		key: 'keyHandler',
		value: function keyHandler(e) {
			_get(SkinCheckbox.prototype.__proto__ || Object.getPrototypeOf(SkinCheckbox.prototype), 'keyHandler', this).call(this, e);

			if (e.keyCode === 13 || e.keyCode === 32) this.$customSkin.trigger('click');
		}
	}, {
		key: 'disabled',
		set: function set(bool) {
			_set(SkinCheckbox.prototype.__proto__ || Object.getPrototypeOf(SkinCheckbox.prototype), 'disabled', bool, this);

			if (this.field.checked) {
				this.changeHandler();
			}
		}
	}]);

	return SkinCheckbox;
}(SkinField);

Me.skinTypes['SkinCheckbox'] = SkinCheckbox;
//# sourceMappingURL=me-skin-checkbox.js.map
