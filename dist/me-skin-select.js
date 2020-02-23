'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkinSelect = function (_SkinField) {
	_inherits(SkinSelect, _SkinField);

	function SkinSelect(options) {
		_classCallCheck(this, SkinSelect);

		var _this = _possibleConstructorReturn(this, (SkinSelect.__proto__ || Object.getPrototypeOf(SkinSelect)).call(this, options));

		_this.$skinChoicesWrapper = jQuery('[me\\:skin\\:choices="' + _this.ID + '"]');
		_this.$choiceSelected = _this.$skinChoicesWrapper.find('.choice[selected]');
		_this.isAnimating = false;

		_this.classes = {
			opening: 'is-opening',
			closing: 'is-closing',
			open: 'is-open',
			native: 'is-native'
		};
		return _this;
	}

	_createClass(SkinSelect, [{
		key: 'setDefault',
		value: function setDefault() {
			if (this.$default.length > 0) {
				this.setSelection(this.$default.index());
			} else {
				this.setSelection(0);
			}
		}
	}, {
		key: 'setDOMAttr',
		value: function setDOMAttr() {
			_get(SkinSelect.prototype.__proto__ || Object.getPrototypeOf(SkinSelect.prototype), 'setDOMAttr', this).call(this);
			this.$field.parent().attr('me:skin:wrapper', this.ID);
			this.$field.removeAttr('me:skin:type');
			this.$field.parent().attr('me:skin:type', this.type);
			this.$skinChoicesWrapper.find('.choice').attr('tabindex', -1);
			this.$field.attr('tabindex', -1);
		}
	}, {
		key: 'setCustomVariables',
		value: function setCustomVariables() {
			if (this.$customSkin) {
				this.$default = this.$field.find('option[default]');
				this.$selection = jQuery('[me\\:skin\\:selection="' + this.ID + '"]');
				this.$wrapper = jQuery('[me\\:skin\\:wrapper="' + this.ID + '"]');
			}

			if (Me.detect && Me.detect.isMobile()) {
				this.$field.addClass(this.classes.native);
			}

			this.isNative = this.$field.hasClass(this.classes.native);
		}
	}, {
		key: 'addEventWhenOpen',
		value: function addEventWhenOpen() {
			var _this2 = this;

			jQuery(document).on('click.skinMe', function (e) {
				_this2.close(e);
			});
			this.$skinChoicesWrapper.find('.choice').on('keydown.skinMe', function (e) {
				if (e.keyCode === 13) {
					_this2.handleSelection(e);
				}
				if (e.keyCode === 9) {
					_this2.close();
				}
			});
			this.$skinChoicesWrapper.find('.choice').on('click.skinMe', function (e) {
				_this2.handleSelection(e);
			});
		}
	}, {
		key: 'removeEventOnClose',
		value: function removeEventOnClose() {
			jQuery(document).off('click.skinMe');
			this.$skinChoicesWrapper.find('.choice').off('keydown.skinMe');
			this.$skinChoicesWrapper.find('.choice').off('click.skinMe');
		}
	}, {
		key: 'addCustomEvents',
		value: function addCustomEvents() {
			var _this3 = this;

			window.addEventListener('resize', function () {
				_this3.close();
			});
			this.$field.on('change.skinMe', function (e) {
				_this3.handleChange(e);
			});

			if (!this.isNative) {
				this.$customSkin.on('click.skinMe', function (e) {
					_this3.handleState(e);
				});

				if (this.$label) {
					this.$label.on('click.skinMe', function (e) {
						_this3.handleState(e);
					});
				}
			}
		}
	}, {
		key: 'removeCustomEvents',
		value: function removeCustomEvents() {
			var _this4 = this;

			window.removeEventListener("resize", function () {
				_this4.close();
			});
			this.$field.off('change.skinMe');

			if (!this.isNative) {
				this.$customSkin.off('click.skinMe');

				if (this.$label) {
					this.$label.off('click.skinMe');
				}
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			this.$choiceSelected = jQuery(this.$skinChoicesWrapper.find('.choice')[this.getSelectedIndex()]);
			this.$skinChoicesWrapper.find('.choice').attr('selected', false);
			jQuery(this.$skinChoicesWrapper.find('.choice')[this.getSelectedIndex()]).attr('selected', true);

			this.updateHtml();
			if (this.isOpen) {
				this.close();
			}
		}
	}, {
		key: 'handleState',
		value: function handleState(e) {
			if (this.disabled) {
				return;
			}

			e.preventDefault();
			e.stopPropagation();

			if (this.isOpen) {
				this.close();
				return;
			}

			this.open();
		}
	}, {
		key: 'open',
		value: function open() {
			var _this5 = this;

			if (this.disabled || this.isAnimating) {
				return;
			}

			this.isAnimating = true;
			this.$skinChoicesWrapper.outerHeight(this.choicesHeight);
			this.$wrapper.addClass(this.classes.opening).on('transitionend', function () {
				_this5.$wrapper.addClass(_this5.classes.open).removeClass(_this5.classes.opening);
				_this5.$wrapper.off('transitionend');
				_this5.isAnimating = false;
				jQuery(_this5.$skinChoicesWrapper.find('.choice')[_this5.getSelectedIndex()]).focus();
			});

			this.addEventWhenOpen();
		}
	}, {
		key: 'close',
		value: function close(e) {
			var _this6 = this;

			if (this.disabled || this.isAnimating) {
				return;
			}

			if (e) e.preventDefault();

			if (this.isOpen) {
				this.isAnimating = true;
			}

			this.$skinChoicesWrapper.outerHeight(0);
			this.$wrapper.addClass(this.classes.closing).on('transitionend', function () {
				_this6.$wrapper.removeClass(_this6.classes.open + ' ' + _this6.classes.closing);
				_this6.$wrapper.off('transitionend');
				_this6.isAnimating = false;
			});

			this.removeEventOnClose();
		}
	}, {
		key: 'handleSelection',
		value: function handleSelection(e) {
			e.preventDefault();
			this.setSelection(jQuery(e.currentTarget).index());
		}
	}, {
		key: 'setSelection',
		value: function setSelection(index) {
			this.$field.find('option').attr('selected', false);
			jQuery(this.$field.find('option')[index]).attr('selected', true);
			this.$field.trigger('change');
		}
	}, {
		key: 'getSelectedIndex',
		value: function getSelectedIndex() {
			return this.$field.find('option[value="' + this.$field.val() + '"]').index();
		}
	}, {
		key: 'updateHtml',
		value: function updateHtml() {
			this.$selection.html(this.$choiceSelected.html());
		}
	}, {
		key: 'keyHandler',
		value: function keyHandler(e) {
			_get(SkinSelect.prototype.__proto__ || Object.getPrototypeOf(SkinSelect.prototype), 'keyHandler', this).call(this, e);

			switch (e.keyCode) {
				case 38:
				case 40:
					if (!this.isOpen) {
						this.open();
					} else {
						var direction = e.keyCode === 38 ? -1 : 1;
						var focusChoiceIndex = this.$customSkin.find(':focus').index();
						var elToFocus = this.$skinChoicesWrapper.find('.choice')[focusChoiceIndex + direction];

						if (elToFocus) {
							elToFocus.focus();
						}
					}
					break;
				case 27:
					this.$customSkin.focus();
					this.close();
					break;
			}
		}
	}, {
		key: 'requirementsExist',
		value: function requirementsExist() {
			var isValid = _get(SkinSelect.prototype.__proto__ || Object.getPrototypeOf(SkinSelect.prototype), 'requirementsExist', this).call(this);

			if (!jQuery('[me\\:skin\\:choices="' + this.ID + '"]').length > 0) {
				console.error('Can\'t find the associated me:skin:choices attribute linked to field. See me:skin:choices in README.md');
			}

			if (!jQuery('[me\\:skin\\:selection="' + this.ID + '"]').length > 0) {
				console.error('Can\'t find the associated me:skin:selection attribute linked to field. See me:skin:selection in README.md');
			}

			return isValid;
		}
	}, {
		key: 'choicesHeight',
		get: function get() {
			var height = 0;

			this.$skinChoicesWrapper.find('.choice').each(function (index, value) {
				height += jQuery(value).outerHeight(true);
			});

			return height;
		}
	}, {
		key: 'isOpen',
		get: function get() {
			return this.$wrapper.hasClass(this.classes.open);
		}
	}]);

	return SkinSelect;
}(SkinField);

if (!window.Me.skinType) {
	Me.skinTypes = [];
}

Me.skinTypes['SkinSelect'] = SkinSelect;
//# sourceMappingURL=me-skin-select.js.map
