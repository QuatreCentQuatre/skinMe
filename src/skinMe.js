/**
 * SkinMe The library to simplify your custom form element
 *
 * Author: Samuel Cléroux-Bouthillier
 * http://www.quatrecentquatre.com
 *
 * Dual licensed under MIT and GNU General Public License version 3 (GPLv3)
 * http://www.opensource.org/licenses/LGPL-3.0
 * Version  : April 2014
 */
(function($, window, document, undefined){
    var SkinMe = function($form, options){
        this.__construct($form, options);
    };

    var defaults = {
        debug : false
    };

    var proto = SkinMe.prototype;

    proto.options = null;

    //--------Methods--------//
    proto.__construct = function($form, options) {
        var scope    = this;
        var settings = (options) ? options : {};
        this.options = $.extend({}, defaults, settings);
        this.$el     = $form;

        var $selector;
        if (this.$el.hasClass('radio')) {
            $selector = this.$el.find('input[type=radio]');
            if ($selector.length > 0) {
                $selector.each(function(index, el){
                    el.skinMe = helperMethods.setVariables(el, scope.$el);
                    el.skinMe.type = "radio";
                    privateMethods.addEventCommons(el.skinMe);
                    privateMethods.addEventRadio(el.skinMe);
                });
            }
        }

        if (this.$el.hasClass('checkbox')) {
            $selector = this.$el.find('input[type=checkbox]');
            if ($selector.length > 0) {
                $selector.each(function(index, el){
                    el.skinMe = helperMethods.setVariables(el, scope.$el);
                    el.skinMe.type = "checkbox";
                    privateMethods.addEventCommons(el.skinMe);
                    privateMethods.addEventCheckbox(el.skinMe);
                });
            }
        }

        if (this.$el.hasClass('select')) {
            $selector = this.$el.find('select');
            if ($selector.length > 0) {
                $selector.each(function(index, el){
                    el.skinMe = helperMethods.setSelectVariables(el, scope.$el);
                    el.skinMe.type = "select";
                    el.skinMe.$skm.on('mouseenter', function(e){
                        el.skinMe.$skm.addClass('hover');
                    });

                    el.skinMe.$skm.on('mouseleave', function(e){
                        el.skinMe.$skm.removeClass('hover');
                    });
                    privateMethods.addEventSelect(el.skinMe);
                });
            }
        }

        this.$el.addClass('activated');
    };

    proto.setOptions = function(options) {
        this.options = $.extend({}, this.options, options);
    };

    var privateMethods = {
        addEventCommons: function(element){
            element.$cz.on('mouseenter', function(e){
                element.$skm.addClass('hover');
            });

            element.$cz.on('mouseleave', function(e){
                element.$skm.removeClass('hover');
            });
        },
        addEventRadio: function(element) {
            if (element.el.checked) {
                element.$skm.addClass('active');
                element.$el.addClass('checked');
            }

            element.$cz.on('click', function skinMeRadioCzHandler(){
                element.$el.trigger('change', 'cz');
            });

            if (element.$label) {
                element.$label.on('click', function skinMeRadioLabelHandler(e){
                    e.preventDefault();
                    element.$el.trigger('change', 'label');
                });
            }

            element.$el.on('change', function skinMeRadioChangeHandler(e, from){
                if (!element.$el.hasClass('checked')) {
                    $.each(element.$form.find('input[name="' + element.name + '"]'), function(index, el){
                        var skinMe = el.skinMe;
                        skinMe.$skm.removeClass('active');
                        skinMe.$el.removeClass('checked');
                        skinMe.el.checked = false;
                    });
                    element.$skm.addClass('active');
                    element.$el.addClass('checked');
                    element.el.checked = true;
                } else {
                    element.$skm.removeClass('active');
                    element.$el.removeClass('checked');
                    element.el.checked = false;
                }
            });
        },
        addEventCheckbox: function(element) {
            if (element.el.checked) {
                element.$skm.addClass('active');
                element.$el.addClass('checked');
            }

            element.$cz.on('click', function skinMeCheckboxCzHandler(){
                element.$el.trigger('change', 'cz');
            });

            if (element.$label) {
                element.$label.on('click', function skinMeCheckboxLabelHandler(e){
                    e.preventDefault();
                    element.$el.trigger('change', 'label');
                });
            }

            element.$el.on('change', function skinMeCheckboxChangeHandler(e, from){
                if (!element.$el.hasClass('checked')) {
                    element.$skm.addClass('active');
                    element.$el.addClass('checked');
                    element.el.checked = true;
                } else {
                    element.$skm.removeClass('active');
                    element.$el.removeClass('checked');
                    element.el.checked = false;
                }
            });
        },
        addEventSelect: function(element) {
            element.$active.html(element.$el.find('option[value="' + element.el.value + '"]')[0].text);

            if (!element.native) {
                element.$mask.on('click', function skinMeSelectClickHandler(e){
                    element.$el.trigger('mousedown');
                    // open custom choices
                    // select custom choices
                    // trigger change on original
                });
            }

            element.$el.on('change', function skinMeCheckboxChangeHandler(e, from){
                element.$active.html(element.$el.find('option[value="' + element.el.value + '"]')[0].text);
            });
        }
    };

    var helperMethods = {
        setVariables: function(el, $form){
            var obj    = {};
            obj.$form  = $form;
            obj.el     = el;
            obj.$el    = $(el);
            obj.name   = $(el).attr('name');
            obj.id     = $(el).attr('id');
            obj.$label = null;
            if (obj.$form.find('label[for=' + obj.id + ']').length > 0) {
                obj.$label = obj.$form.find('label[for=' + obj.id + ']');
            }

            obj.$skm   = null;
            if (obj.$form.find('#skinme-' + obj.id).length > 0) {
                obj.$skm = obj.$form.find('#skinme-' + obj.id);
            }

            obj.$cz    = null;
            if (obj.$skm != null && obj.$skm.find('.skinme-cz').length > 0) {
                obj.$cz = obj.$skm.find('.skinme-cz');
            } else {
                obj.$cz = obj.$skm;
            }

            return obj;
        },
        setSelectVariables: function(el, $form){
            var obj    = {};
            obj.$form  = $form;
            obj.el     = el;
            obj.$el    = $(el);
            obj.name   = $(el).attr('name');
            obj.id     = $(el).attr('id');
            obj.$label = null;
            if (obj.$form.find('label[for=' + obj.id + ']').length > 0) {
                obj.$label = obj.$form.find('label[for=' + obj.id + ']');
            }

            obj.$skm   = null;
            if (obj.$form.find('#skinme-' + obj.id).length > 0) {
                obj.$skm = obj.$form.find('#skinme-' + obj.id);
            }

            obj.$mask  = null;
            if (obj.$skm) {
                obj.$mask = obj.$skm.find('.skinme-mask');
            }

            obj.$active = null;
            if (obj.$skm) {
                obj.$active = obj.$skm.find('.active-choice');
            }

            obj.$toggler = null;
            if (obj.$skm) {
                obj.$toggler = obj.$skm.find('.toggler');
            }

            obj.native   = (obj.$el.hasClass('native'));

            return obj;
        }
    };

    if(!window.Me) {
        window.Me = {};
    }
    Me.skin = SkinMe;
}(jQuery, window, document));