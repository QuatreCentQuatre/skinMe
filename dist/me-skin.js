"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
 * Version: 3.1.5
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
    this.ID = this.field.getAttribute('id');
    this.name = this.field.getAttribute('name');
    this.type = this.field.hasAttribute('type') ? this.field.getAttribute('type') : this.field.tagName.toLowerCase();
    this.label = this.field.parentElement.querySelector('label[for="' + this.ID + '"]') ? this.field.parentElement.querySelector('label[for="' + this.ID + '"]') : null;
    this.customSkin = this.field.parentElement.querySelector("[me\\:skin\\:id=\"".concat(this.ID, "\"]")) ? this.field.parentElement.querySelector("[me\\:skin\\:id=\"".concat(this.ID, "\"]")) : null;
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
      if (!this.customSkin) return; // this.removeCommonEvents();

      this.addCommonEvents(); //
      // Add specific variables depending of the field type

      this.removeCustomEvents();
      this.addCustomEvents();
      this.setInitialValue();
    }
  }, {
    key: "addCommonEvents",
    value: function addCommonEvents() {
      this.customSkin.addEventListener('mouseenter', this.toggleHover.bind(this));
      this.customSkin.addEventListener('mouseleave', this.toggleHover.bind(this));
      this.customSkin.addEventListener('keydown', this.keyHandler.bind(this));
    }
  }, {
    key: "removeCommonEvents",
    value: function removeCommonEvents() {
      this.customSkin.removeEventListener('mouseenter', this.toggleHover.bind(this));
      this.customSkin.removeEventListener('mouseleave', this.toggleHover.bind(this));
      this.customSkin.removeEventListener('keydown', this.keyHandler.bind(this));
    }
  }, {
    key: "setDOMAttr",
    value: function setDOMAttr() {
      this.field.setAttribute('me:skin:render', "true");
      this.field.setAttribute('me:skin:type', this.type);
      this.customSkin.setAttribute('me:skin:render', "true");
      this.customSkin.setAttribute('me:skin:disabled', this.field.disabled);

      if (!this.field.disabled) {
        this.customSkin.setAttribute('tabindex', 0);
      }
    }
  }, {
    key: "dependenciesExist",
    value: function dependenciesExist() {
      var isValid = true; // @NOTE Only here in case some dependencies needs to be added in a near future

      return isValid;
    }
  }, {
    key: "requirementsExist",
    value: function requirementsExist() {
      var isValid = true;

      if (!this.customSkin) {
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
      if (this.field.hasAttribute('disabled') && this.field.getAttribute('disabled')) {
        return;
      }

      this.customSkin.classList.toggle('hover');
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

      this.field.setAttribute('disabled', bool);
      this._disabled = bool;

      if (this.customSkin) {
        this.customSkin.setAttribute('me:skin:disabled', bool);

        if (bool === true) {
          this.customSkin.setAttribute('tabindex', -1);
        } else {
          this.customSkin.setAttribute('tabindex', 0);
        }
      }
    }
  }]);

  return SkinField;
}();

var SkinSelect = /*#__PURE__*/function (_SkinField) {
  _inherits(SkinSelect, _SkinField);

  var _super = _createSuper(SkinSelect);

  function SkinSelect(options) {
    var _this;

    _classCallCheck(this, SkinSelect);

    _this = _super.call(this, options);
    _this.preventDefaultChangeEvent = _this.field.hasAttribute('me:skin:prevent-default');
    _this.skinChoicesWrapper = _this.field.parentNode.querySelector("[me\\:skin\\:choices=\"".concat(_this.ID, "\"]"));
    _this.choiceSelected = _this.skinChoicesWrapper.querySelector('.choice[selected]');
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
    key: "initialize",
    value: function initialize() {
      _get(_getPrototypeOf(SkinSelect.prototype), "initialize", this).call(this);

      this.setDefault();

      if (this.skinChoicesWrapper.hasAttribute('data-scrollbar') && Scrollbar) {
        var option = this.skinChoicesWrapper.hasAttribute('data-scrollbar-options') ? JSON.parse(this.skinChoicesWrapper.getAttribute('data-scrollbar-options')) : {};
        console.log(option);
        Scrollbar.init(this.skinChoicesWrapper, option);
      }
    }
  }, {
    key: "setDefault",
    value: function setDefault() {
      if (this.defaults) {
        this.skinChoicesWrapper.querySelectorAll('.choice')[Array.from(this.defaults.parentNode.children).indexOf(this.defaults)].setAttribute('default', true);
      }
    }
  }, {
    key: "setInitialValue",
    value: function setInitialValue() {
      if (this.selected) {
        this.setSelection(Array.from(this.selected.parentNode.children).indexOf(this.selected), this.preventDefaultChangeEvent);
      } else {
        this.setSelection(0, this.preventDefaultChangeEvent);
      }
    }
  }, {
    key: "setDOMAttr",
    value: function setDOMAttr() {
      _get(_getPrototypeOf(SkinSelect.prototype), "setDOMAttr", this).call(this);

      this.field.parentNode.setAttribute('me:skin:wrapper', this.ID);
      this.field.removeAttribute('me:skin:type');
      this.field.parentNode.setAttribute('me:skin:type', this.type);
      this.skinChoicesWrapper.querySelectorAll('.choice').forEach(function (value, key) {
        value.setAttribute('tabindex', -1);
      });
      this.field.setAttribute('tabindex', -1);
    }
  }, {
    key: "setCustomVariables",
    value: function setCustomVariables() {
      if (this.customSkin) {
        this.defaults = this.field.querySelector("option[default]");
        this.selected = this.field.querySelector("option[selected]");
        this.selection = this.field.parentNode.querySelector("[me\\:skin\\:selection=\"".concat(this.ID, "\"]"));
        this.wrapper = this.field.parentNode;
      }

      if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i)) {
        this.field.addClass(this.classes.native);
      }

      this.isNative = this.field.classList.contains(this.classes.native);
    }
  }, {
    key: "addEventWhenOpen",
    value: function addEventWhenOpen() {
      var scope = this;
      document.addEventListener('click', this.close.bind(this));
      this.skinChoicesWrapper.querySelectorAll('.choice').forEach(function (value, index) {
        value.addEventListener('keydown', scope.keydownOnChoice.bind(scope));
        value.addEventListener('click', scope.handleSelection.bind(scope));
      });
    }
  }, {
    key: "keydownOnChoice",
    value: function keydownOnChoice(e) {
      if (e.keyCode === 13) {
        this.handleSelection(e);
      }

      if (e.keyCode === 9) {
        this.close();
      }
    }
  }, {
    key: "removeEventOnClose",
    value: function removeEventOnClose() {
      var scope = this;
      document.removeEventListener('click', this.close.bind(this));
      this.skinChoicesWrapper.querySelectorAll('.choice').forEach(function (value, index) {
        value.removeEventListener('keydown', scope.keydownOnChoice.bind(scope));
        value.removeEventListener('click', scope.handleSelection.bind(scope));
      });
    }
  }, {
    key: "addCustomEvents",
    value: function addCustomEvents() {
      var _this2 = this;

      window.addEventListener('resize', function () {
        if (_this2.isOpen) {
          _this2.close();
        }
      });
      this.field.addEventListener('change', this.handleChange.bind(this));

      if (!this.isNative) {
        this.customSkin.addEventListener('click', this.handleState.bind(this));

        if (this.label) {
          this.label.addEventListener('click', this.handleState.bind(this));
        }
      }
    }
  }, {
    key: "removeCustomEvents",
    value: function removeCustomEvents() {
      var _this3 = this;

      window.removeEventListener("resize", function () {
        if (_this3.isOpen) {
          _this3.close();
        }
      });
      this.field.removeEventListener('change', this.handleChange.bind(this));

      if (!this.isNative) {
        this.customSkin.removeEventListener('click', this.handleState.bind(this));

        if (this.label) {
          this.label.removeEventListener('click', this.handleState.bind(this));
        }
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var _this4 = this;

      this.choiceSelected = this.skinChoicesWrapper.querySelectorAll('.choice')[this.getSelectedIndex()];
      this.skinChoicesWrapper.querySelectorAll('.choice').forEach(function (value, nodeIndex) {
        value.setAttribute('selected', false);

        if (nodeIndex === _this4.getSelectedIndex()) {
          value.setAttribute('selected', true);
        }
      });
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

      e.preventDefault();

      if (this.isOpen) {
        this.close();
        return;
      }

      this.open();
    }
  }, {
    key: "open",
    value: function open() {
      if (this.field.disabled || this.isAnimating) {
        return;
      }

      var selects = document.querySelectorAll('select:not(' + this.field.getAttribute('name') + ')');
      selects.forEach(function (value, index) {
        var field = Me.skin.getField(value);

        if (field) {
          field.close();
        }
      });
      this.isAnimating = true;
      this.skinChoicesWrapper.style.height = this.choicesHeight();
      this.wrapper.classList.add(this.classes.opening);
      this.wrapper.addEventListener('transitionend', this.handleEndOpenTransition.bind(this));
      this.addEventWhenOpen();
    }
  }, {
    key: "close",
    value: function close(e) {
      if (this.field.disabled || this.isAnimating) {
        return;
      }

      if (e) e.preventDefault();

      if (this.isOpen) {
        this.isAnimating = true;
      }

      this.skinChoicesWrapper.style.height = '0px';
      this.wrapper.classList.add(this.classes.closing);
      this.wrapper.addEventListener('transitionend', this.handleEndCloseTransition.bind(this));
      this.removeEventOnClose();
    }
  }, {
    key: "handleEndOpenTransition",
    value: function handleEndOpenTransition(e) {
      this.wrapper.classList.add(this.classes.open);
      this.wrapper.classList.remove(this.classes.opening);
      this.wrapper.removeEventListener('transitionend', this.handleEndOpenTransition.bind(this));
      this.isAnimating = false;
      this.skinChoicesWrapper.querySelectorAll('.choice')[this.getSelectedIndex()].focus();
    }
  }, {
    key: "handleEndCloseTransition",
    value: function handleEndCloseTransition(e) {
      this.wrapper.classList.remove("".concat(this.classes.open), "".concat(this.classes.closing));
      this.wrapper.removeEventListener('transitionend', this.handleEndCloseTransition.bind(this));
      this.isAnimating = false;
    }
  }, {
    key: "handleSelection",
    value: function handleSelection(e) {
      e.preventDefault();
      this.setSelection(Array.from(event.target.parentNode.children).indexOf(event.target));
    }
  }, {
    key: "setSelection",
    value: function setSelection() {
      var _this5 = this;

      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var preventTrigger = arguments.length > 1 ? arguments[1] : undefined;
      this.field.querySelectorAll('option').forEach(function (value, nodeIndex) {
        value.setAttribute('selected', false);

        if (nodeIndex === index) {
          value.setAttribute('selected', 'selected');
          _this5.field.value = value.getAttribute('value');

          if (!preventTrigger) {
            _this5.field.dispatchEvent(new Event('change'));
          } else {
            _this5.updateHtml();
          }
        }
      });
    }
  }, {
    key: "getSelectedIndex",
    value: function getSelectedIndex() {
      var selectedEl = this.field.querySelector('option[value="' + this.field.value + '"]');
      return Array.from(selectedEl.parentNode.children).indexOf(selectedEl);
    }
  }, {
    key: "updateHtml",
    value: function updateHtml() {
      this.selection.textContent = this.choiceSelected.textContent;
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
            var focusChoiceIndex = Array.from(this.customSkin.querySelector(':focus').parentNode.children).indexOf(this.customSkin.querySelector(':focus'));
            var elToFocus = this.skinChoicesWrapper.querySelectorAll('.choice')[focusChoiceIndex + direction];

            if (elToFocus) {
              elToFocus.focus();
            }
          }

          break;

        case 27:
          this.customSkin.focus();
          this.close();
          break;
      }
    }
  }, {
    key: "requirementsExist",
    value: function requirementsExist() {
      var isValid = _get(_getPrototypeOf(SkinSelect.prototype), "requirementsExist", this).call(this);

      if (!document.querySelector("[me\\:skin\\:choices=\"".concat(this.ID, "\"]"))) {
        console.error("Can't find the associated me:skin:choices attribute linked to field. See me:skin:choices in README.md");
      }

      if (!document.querySelector("[me\\:skin\\:selection=\"".concat(this.ID, "\"]"))) {
        console.error("Can't find the associated me:skin:selection attribute linked to field. See me:skin:selection in README.md");
      }

      return isValid;
    }
  }, {
    key: "choicesHeight",
    value: function choicesHeight() {
      var height = 0;
      this.skinChoicesWrapper.querySelectorAll('.choice').forEach(function (value, index) {
        height += value.offsetHeight;
      });
      return "".concat(height, "px");
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.wrapper.classList.contains(this.classes.open);
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
      var $rootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('html');
      this.clearFields();
      var fields = $rootElement.querySelectorAll('[me\\:skin]');
      this.newFields = [];

      for (var i = 0; i < fields.length; i++) {
        this.addField(fields[i]);
      } // /* Initialize all new fields*/


      for (var j = 0; j < this._newFields.length; j++) {
        this.newFields[j].initialize();
      }
    }
  }, {
    key: "getField",
    value: function getField(fieldEl) {
      for (var i in this.fields) {
        var field = this.fields[i];

        if (field.ID === fieldEl.getAttribute('id')) {
          return field;
        }
      }
    }
  }, {
    key: "addField",
    value: function addField(fieldEl) {
      var shouldInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var fieldType = fieldEl.getAttribute('me:skin');
      var fieldParams = {
        field: fieldEl,
        type: fieldType
      };
      var className = "Skin".concat(fieldType.charAt(0).toUpperCase()).concat(fieldType.slice(1));
      /* Look if the field is valid */

      if (typeof Me.skinTypes[className] !== "function") {
        console.error("The skin type ".concat(className, " does not exist. Please select one listed in the following array"), Object.keys(Me.skinTypes));
        return;
      }
      /* Look if the field has already been rendered */


      if (fieldEl.getAttribute('me:skin:render')) {
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

        if (_typeof(field) == "object") {
          if (document.body.contains(field.el)) {
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

if (!window.Me) {
  window.Me = {};
}

Me.skin = new SkinManager();
document.addEventListener('DOMContentLoaded', function (event) {
  Me.skin.initFields();
});