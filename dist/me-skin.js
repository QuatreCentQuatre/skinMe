"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * SkinMe: A library to simplify radio, checkbox, select customization
 *
 * Author: Samuel Cléroux-Bouthillier && Nicolas Lemoyne
 * http://www.quatrecentquatre.com
 *
 * Dual licensed under MIT and GNU General Public License version 3 (GPLv3)
 * http://www.opensource.org/licenses/LGPL-3.0
 * Version: 3.0.0
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
if (!window.Me) {
  window.Me = {};
}

if (!window.Me.skinType) {
  Me.skinTypes = [];
}

var SkinField = /*#__PURE__*/function () {
  function SkinField(options) {
    _classCallCheck(this, SkinField);

    this.field = options.field;
    this.$field = jQuery(options.field);
    this.ID = this.$field.attr('id');
    this.name = this.$field.attr('name');
    this.type = this.$field.attr('type') ? this.$field.attr('type') : this.$field.prop("tagName").toLowerCase(); // this.disabled 		= !!this.$field.attr('disabled');

    this.$label = this.$field.parent().find('label[for="' + this.ID + '"]').length > 0 ? this.$field.parent().find('label[for="' + this.ID + '"]') : null;
    this.$customSkin = this.$field.parent().find("[me\\:skin\\:id=\"".concat(this.ID, "\"]")).length > 0 ? this.$field.parent().find("[me\\:skin\\:id=\"".concat(this.ID, "\"]")) : null;
    if (!this.dependenciesExist() || !this.requirementsExist()) return;
    this.options = {
      debug: window.SETTINGS && SETTINGS.DEBUG_MODE ? SETTINGS.DEBUG_MODE : false
    };
  }

  _createClass(SkinField, [{
    key: "initialize",
    value: function initialize() {
      // Set common variables used by every field type
      this.setDOMAttr();
      this.setCustomVariables();
      if (!this.$customSkin) return;
      this.removeCommonEvents();
      this.addCommonEvents(); // Add specific variables depending of the field type

      this.removeCustomEvents();
      this.addCustomEvents();
      this.setInitialValue();
    }
  }, {
    key: "addCommonEvents",
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
    key: "removeCommonEvents",
    value: function removeCommonEvents() {
      this.$customSkin.off('mouseenter.skinMe mouseleave.skinMe');
      this.$customSkin.off('keydown.skinMe');
    }
  }, {
    key: "setDOMAttr",
    value: function setDOMAttr() {
      this.$field.attr('me:skin:render', "true");
      this.$field.attr('me:skin:type', this.type);
      this.$customSkin.attr('me:skin:render', "true");
      this.$customSkin.attr('me:skin:disabled', this.field.disabled);
      this.$customSkin.attr('me:skin:theme', this.$field.attr('me:skin:theme'));
      this.$field.removeAttr('me:skin:theme');

      if (!this.field.disabled) {
        this.$customSkin.attr('tabindex', 0);
      }
    }
  }, {
    key: "dependenciesExist",
    value: function dependenciesExist() {
      var isValid = true;

      if (!window.$) {
        console.warn("SkinMe :: Dependencies :: required jquery (http://jquery.com/)");
        isValid = false;
      }

      return isValid;
    }
  }, {
    key: "requirementsExist",
    value: function requirementsExist() {
      var isValid = true;

      if (!this.$customSkin) {
        console.error("Skin element associated with ID:".concat(this.ID, " can't be found. Add me:skin:id=\"").concat(this.ID, "\""));
        isValid = false;
      }

      if (!this.ID) {
        console.error("ID attribute must be defined on the native field");
        isValid = false;
      }

      return isValid;
    }
  }, {
    key: "toggleHover",
    value: function toggleHover(e) {
      if (this.$field.attr('disabled')) {
        return;
      }

      this.$customSkin.toggleClass('hover');
    }
  }, {
    key: "setCustomVariables",
    // Those functions need to be overwrite by each type of field
    value: function setCustomVariables() {}
  }, {
    key: "addCustomEvents",
    value: function addCustomEvents() {}
  }, {
    key: "removeCustomEvents",
    value: function removeCustomEvents() {}
  }, {
    key: "setInitialValue",
    value: function setInitialValue() {}
  }, {
    key: "keyHandler",
    value: function keyHandler(e) {}
  }, {
    key: "name",
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
    key: "type",
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
    key: "ID",
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
    key: "options",
    get: function get() {
      return this._options;
    },
    set: function set(params) {
      this._options = params;
    }
  }, {
    key: "disabled",
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

var SkinCheckbox = /*#__PURE__*/function (_SkinField) {
  _inherits(SkinCheckbox, _SkinField);

  var _super = _createSuper(SkinCheckbox);

  function SkinCheckbox(options) {
    var _this2;

    _classCallCheck(this, SkinCheckbox);

    _this2 = _super.call(this, options);
    _this2.classes = {
      checked: 'is-checked'
    };
    return _this2;
  }

  _createClass(SkinCheckbox, [{
    key: "addCustomEvents",
    value: function addCustomEvents() {
      var _this3 = this;

      this.$field.on('change.skinMe', function (e) {
        _this3.changeHandler(e);
      });
      this.$customSkin.on('click.skinMe', function (e) {
        _this3.clickHandler(e);
      });

      if (this.$label) {
        this.$label.on('click.skinMe', function (e) {
          _this3.clickHandler(e);
        });
      }
    }
  }, {
    key: "removeCustomEvents",
    value: function removeCustomEvents() {
      this.$field.off('change.skinMe');
      this.$customSkin.off('click.skinMe');

      if (this.$label) {
        this.$label.off('click.skinMe');
      }
    }
  }, {
    key: "changeHandler",
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
    key: "clickHandler",
    value: function clickHandler(e) {
      if (this.field.disabled) {
        return;
      }

      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      this.$field.trigger('change.skinMe');
    }
  }, {
    key: "keyHandler",
    value: function keyHandler(e) {
      _get(_getPrototypeOf(SkinCheckbox.prototype), "keyHandler", this).call(this, e);

      if (e.keyCode === 13 || e.keyCode === 32) this.$customSkin.trigger('click.skinMe');
    }
  }, {
    key: "disabled",
    set: function set(bool) {
      _set(_getPrototypeOf(SkinCheckbox.prototype), "disabled", bool, this, true);

      if (this.field.checked) {
        this.changeHandler();
      }
    }
  }]);

  return SkinCheckbox;
}(SkinField);

Me.skinTypes['SkinCheckbox'] = SkinCheckbox;

var SkinRadio = /*#__PURE__*/function (_SkinField2) {
  _inherits(SkinRadio, _SkinField2);

  var _super2 = _createSuper(SkinRadio);

  function SkinRadio(options) {
    var _this4;

    _classCallCheck(this, SkinRadio);

    _this4 = _super2.call(this, options);
    _this4.classes = {
      checked: 'is-checked'
    };
    return _this4;
  }

  _createClass(SkinRadio, [{
    key: "addCustomEvents",
    value: function addCustomEvents() {
      var _this5 = this;

      this.$field.on('change.skinMe', function (e) {
        _this5.changeHandler(e);
      });
      this.$customSkin.on('click.skinMe', function (e) {
        _this5.clickHandler(e);
      });

      if (this.$label) {
        this.$label.on('click.skinMe', function (e) {
          _this5.clickHandler(e);
        });
      }
    }
  }, {
    key: "removeCustomEvents",
    value: function removeCustomEvents() {
      this.$field.off('change.skinMe');
      this.$customSkin.off('click.skinMe');

      if (this.$label) {
        this.$label.off('click.skinMe');
      }
    }
  }, {
    key: "changeHandler",
    value: function changeHandler(e) {
      var _this6 = this;

      if (!this.field.checked) {
        jQuery.each(jQuery('input[name="' + this.name + '"]'), function (index, el) {
          var field = Me.skin.getField(jQuery(el));
          field.$customSkin.removeClass(_this6.classes.checked);
          field.$field.removeClass(_this6.classes.checked);
          field.field.checked = false;
        });
        this.$customSkin.addClass(this.classes.checked);
        this.$field.addClass(this.classes.checked);
        this.field.checked = true;
      }
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      if (this.field.disabled) {
        return;
      }

      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      this.$field.trigger('change', 'label');
    }
  }, {
    key: "keyHandler",
    value: function keyHandler(e) {
      _get(_getPrototypeOf(SkinRadio.prototype), "keyHandler", this).call(this, e);

      if (e.keyCode === 13 || e.keyCode === 32) this.$customSkin.trigger('click');
    }
  }]);

  return SkinRadio;
}(SkinField);

Me.skinTypes['SkinRadio'] = SkinRadio;

var SkinSelect = /*#__PURE__*/function (_SkinField3) {
  _inherits(SkinSelect, _SkinField3);

  var _super3 = _createSuper(SkinSelect);

  function SkinSelect(options) {
    var _this7;

    _classCallCheck(this, SkinSelect);

    _this7 = _super3.call(this, options);
    _this7.preventDefaultChangeEvent = _this7.$field[0].hasAttribute('me:skin:prevent-default');
    _this7.$skinChoicesWrapper = _this7.$field.parent().find("[me\\:skin\\:choices=\"".concat(_this7.ID, "\"]"));
    _this7.$choiceSelected = _this7.$skinChoicesWrapper.find('.choice[selected]');
    _this7.isAnimating = false;
    _this7.classes = {
      opening: 'is-opening',
      closing: 'is-closing',
      open: 'is-open',
      native: 'is-native'
    };
    return _this7;
  }

  _createClass(SkinSelect, [{
    key: "initialize",
    value: function initialize() {
      _get(_getPrototypeOf(SkinSelect.prototype), "initialize", this).call(this);

      this.setDefault();
    }
  }, {
    key: "setDefault",
    value: function setDefault() {
      var _this8 = this;

      this.$defaults.each(function (index, value) {
        jQuery(_this8.$skinChoicesWrapper.find('.choice')[_this8.$field.find('option[value="' + $(value).val() + '"]').index()]).attr('default', true);
      });
    }
  }, {
    key: "setInitialValue",
    value: function setInitialValue() {
      if (this.$selected.length > 0) {
        this.setSelection(this.$selected.index(), this.preventDefaultChangeEvent);
      } else {
        this.setSelection(0, this.preventDefaultChangeEvent);
      }
    }
  }, {
    key: "setDOMAttr",
    value: function setDOMAttr() {
      _get(_getPrototypeOf(SkinSelect.prototype), "setDOMAttr", this).call(this);

      this.$field.parent().attr('me:skin:wrapper', this.ID);
      this.$field.removeAttr('me:skin:type');
      this.$field.parent().attr('me:skin:type', this.type);
      this.$skinChoicesWrapper.find('.choice').attr('tabindex', -1);
      this.$field.attr('tabindex', -1);
    }
  }, {
    key: "setCustomVariables",
    value: function setCustomVariables() {
      if (this.$customSkin) {
        this.$defaults = this.$field.find("option[default]");
        this.$selected = this.$field.find("option[selected]");
        this.$selection = this.$field.parent().find("[me\\:skin\\:selection=\"".concat(this.ID, "\"]"));
        this.$wrapper = this.$field.parent();
      }

      if (Me.detect && Me.detect.isMobile()) {
        this.$field.addClass(this.classes.native);
      }

      this.isNative = this.$field.hasClass(this.classes.native);
    }
  }, {
    key: "addEventWhenOpen",
    value: function addEventWhenOpen() {
      var _this9 = this;

      jQuery(document).on('click.skinMe', function (e) {
        _this9.close(e);
      });
      this.$skinChoicesWrapper.find('.choice').on('keydown.skinMe', function (e) {
        if (e.keyCode === 13) {
          _this9.handleSelection(e);
        }

        if (e.keyCode === 9) {
          _this9.close();
        }
      });
      this.$skinChoicesWrapper.find('.choice').on('click.skinMe', function (e) {
        _this9.handleSelection(e);
      });
    }
  }, {
    key: "removeEventOnClose",
    value: function removeEventOnClose() {
      jQuery(document).off('click.skinMe');
      this.$skinChoicesWrapper.find('.choice').off('keydown.skinMe');
      this.$skinChoicesWrapper.find('.choice').off('click.skinMe');
    }
  }, {
    key: "addCustomEvents",
    value: function addCustomEvents() {
      var _this10 = this;

      window.addEventListener('resize', function () {
        if (_this10.isOpen) {
          _this10.close();
        }
      });
      this.$field.on('change.skinMe', function (e) {
        _this10.handleChange(e);
      });

      if (!this.isNative) {
        this.$customSkin.on('click.skinMe', function (e) {
          _this10.handleState(e);
        });

        if (this.$label) {
          this.$label.on('click.skinMe', function (e) {
            _this10.handleState(e);
          });
        }
      }
    }
  }, {
    key: "removeCustomEvents",
    value: function removeCustomEvents() {
      var _this11 = this;

      window.removeEventListener("resize", function () {
        if (_this11.isOpen) {
          _this11.close();
        }
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
    key: "handleChange",
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
    key: "handleState",
    value: function handleState(e) {
      if (this.field.disabled) {
        return;
      }

      e.preventDefault(); // e.stopPropagation();

      if (this.isOpen) {
        this.close();
        return;
      }

      this.open();
    }
  }, {
    key: "open",
    value: function open() {
      var _this12 = this;

      if (this.field.disabled || this.isAnimating) {
        return;
      }

      var selects = $('select:not(' + this.$field.attr('name') + ')');
      console.log(selects);
      selects.each(function (index, value) {
        Me.skin.getField($(value)).close();
      });
      this.isAnimating = true;
      this.$skinChoicesWrapper.outerHeight(this.choicesHeight);
      this.$wrapper.addClass(this.classes.opening).on('transitionend', function () {
        _this12.$wrapper.addClass(_this12.classes.open).removeClass(_this12.classes.opening);

        _this12.$wrapper.off('transitionend');

        _this12.isAnimating = false;
        jQuery(_this12.$skinChoicesWrapper.find('.choice')[_this12.getSelectedIndex()]).focus();
      });
      this.addEventWhenOpen();
    }
  }, {
    key: "close",
    value: function close(e) {
      var _this13 = this;

      if (this.field.disabled || this.isAnimating) {
        return;
      }

      if (e) e.preventDefault();

      if (this.isOpen) {
        this.isAnimating = true;
      }

      this.$skinChoicesWrapper.outerHeight(0);
      this.$wrapper.addClass(this.classes.closing).on('transitionend', function () {
        _this13.$wrapper.removeClass("".concat(_this13.classes.open, " ").concat(_this13.classes.closing));

        _this13.$wrapper.off('transitionend');

        _this13.isAnimating = false;
      });
      this.removeEventOnClose();
    }
  }, {
    key: "handleSelection",
    value: function handleSelection(e) {
      e.preventDefault();
      this.setSelection(jQuery(e.currentTarget).index());
    }
  }, {
    key: "setSelection",
    value: function setSelection(index, preventTrigger) {
      this.$field.find('option').attr('selected', false); // jQuery(this.$field.find('option')[index]).attr('selected', true); // @NOTE: issue on reset: previously selected value cant be selected anymore

      jQuery(this.$field.find("option")[index])[0].selected = 'selected';

      if (!preventTrigger) {
        this.$field.trigger('change');
      } else {
        this.updateHtml();
      }
    }
  }, {
    key: "getSelectedIndex",
    value: function getSelectedIndex() {
      return this.$field.find('option[value="' + this.$field.val() + '"]').index();
    }
  }, {
    key: "updateHtml",
    value: function updateHtml() {
      this.$selection.html(this.$choiceSelected.html());
    }
  }, {
    key: "keyHandler",
    value: function keyHandler(e) {
      _get(_getPrototypeOf(SkinSelect.prototype), "keyHandler", this).call(this, e);

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
    key: "requirementsExist",
    value: function requirementsExist() {
      var isValid = _get(_getPrototypeOf(SkinSelect.prototype), "requirementsExist", this).call(this);

      if (!jQuery("[me\\:skin\\:choices=\"".concat(this.ID, "\"]")).length > 0) {
        console.error("Can't find the associated me:skin:choices attribute linked to field. See me:skin:choices in README.md");
      }

      if (!jQuery("[me\\:skin\\:selection=\"".concat(this.ID, "\"]")).length > 0) {
        console.error("Can't find the associated me:skin:selection attribute linked to field. See me:skin:selection in README.md");
      }

      return isValid;
    }
  }, {
    key: "choicesHeight",
    get: function get() {
      var height = 0;
      this.$skinChoicesWrapper.find('.choice').filter(":visible").each(function (index, value) {
        height += jQuery(value).outerHeight(true);
      });
      return height;
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.$wrapper.hasClass(this.classes.open);
    }
  }]);

  return SkinSelect;
}(SkinField);

Me.skinTypes['SkinSelect'] = SkinSelect;

var SkinManager = /*#__PURE__*/function () {
  function SkinManager(options) {
    _classCallCheck(this, SkinManager);

    this.name = "SkinManager";
    this.fields = [];
    this.options = options;
    this.newFields = [];
  }

  _createClass(SkinManager, [{
    key: "initFields",
    value: function initFields() {
      var $root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jQuery('html');
      this.clearFields();
      var fields = $root.find('[me\\:skin]');
      this.newFields = [];

      for (var i = 0; i < fields.length; i++) {
        this.addField(jQuery(fields[i]));
      } // /* Initialize all new fields*/


      for (var j = 0; j < this._newFields.length; j++) {
        this.newFields[j].initialize();
      }
    }
  }, {
    key: "getField",
    value: function getField($field) {
      for (var i in this.fields) {
        var field = this.fields[i];

        if (field.ID === $field.attr('id')) {
          return field;
        }
      }
    }
  }, {
    key: "addField",
    value: function addField($field) {
      var shouldInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var fieldType = $field.attr('me:skin');
      var fieldParams = {
        field: $field[0],
        type: fieldType
      };
      var className = "Skin".concat(fieldType.charAt(0).toUpperCase()).concat(fieldType.slice(1));
      /* Look if the field is valid */

      if (typeof Me.skinTypes[className] !== "function") {
        console.error("The skin type ".concat(className, " does not exist. Please select one listed in the following array"), Object.keys(Me.skinTypes));
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
    key: "clearFields",
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
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;
    }
  }, {
    key: "options",
    set: function set(params) {
      this._options = params;
    },
    get: function get() {
      return this._options;
    }
  }, {
    key: "newFields",
    get: function get() {
      return this._newFields;
    },
    set: function set(newFields) {
      this._newFields = newFields;
    }
  }, {
    key: "fields",
    get: function get() {
      return this._fields;
    },
    set: function set(fields) {
      this._fields = fields;
    }
  }]);

  return SkinManager;
}();

Me.skin = new SkinManager();
jQuery(document).ready(function () {
  Me.skin.initFields();
});