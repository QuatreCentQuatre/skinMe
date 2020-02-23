'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkinRadio = function (_SkinField) {
	_inherits(SkinRadio, _SkinField);

	function SkinRadio(options) {
		_classCallCheck(this, SkinRadio);

		var _this = _possibleConstructorReturn(this, (SkinRadio.__proto__ || Object.getPrototypeOf(SkinRadio)).call(this, options));

		_this.classes = {
			checked: 'is-checked'
		};
		return _this;
	}

	_createClass(SkinRadio, [{
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
			var _this3 = this;

			if (!this.field.checked) {
				$.each(jQuery('input[name="' + this.name + '"]'), function (index, el) {
					var field = Me.skin.getField(jQuery(el));
					field.$customSkin.removeClass(_this3.classes.checked);
					field.$field.removeClass(_this3.classes.checked);
					field.field.checked = false;
				});

				this.$customSkin.addClass(this.classes.checked);
				this.$field.addClass(this.classes.checked);
				this.field.checked = true;
			}
		}
	}, {
		key: 'clickHandler',
		value: function clickHandler(e) {
			if (this.disabled) {
				return;
			}
			e.preventDefault();
			e.stopImmediatePropagation();
			e.stopPropagation();
			this.$field.trigger('change', 'label');
		}
	}, {
		key: 'keyHandler',
		value: function keyHandler(e) {
			_get(SkinRadio.prototype.__proto__ || Object.getPrototypeOf(SkinRadio.prototype), 'keyHandler', this).call(this, e);

			if (e.keyCode === 13 || e.keyCode === 32) this.$customSkin.trigger('click');
		}
	}]);

	return SkinRadio;
}(SkinField);

Me.skinTypes['SkinRadio'] = SkinRadio;
//# sourceMappingURL=me-skin-radio.js.map
