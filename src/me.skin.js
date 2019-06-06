/**
 * SkinMe The library to simplify your custom form element
 *
 * Author: Samuel Cléroux-Bouthillier
 * http://www.quatrecentquatre.com
 *
 * Dual licensed under MIT and GNU General Public License version 3 (GPLv3)
 * http://www.opensource.org/licenses/LGPL-3.0
 * Version: 1.0.2
 * Release date: April 2014
 */
(function($, window, document, undefined) {
	var SkinMeID   = 1;
	var SkinMeName = "skinMe";

	var SkinMe = function($form, options) {
		this.id    = SkinMeID;
		this.name  = SkinMeName + "-" + String(this.id) + ":: ";
		this.$form = $form;
		this.__construct(options);
		SkinMeID ++;
	};

	var defaults = {
		debug : false
	};

	var p = SkinMe.prototype;

	p.options = null;

	//--------Methods--------//
	p.__construct = function(options) {
		var settings = (options) ? options : {};
		this.options = $.extend({}, defaults, settings);
		this.fields = this.fetchField();
	};

	p.__dependencies = function() {
		var isOk = true;

		return isOk;
	};

	p.toString = function() {
		return this.name;
	};

	p.setOpts = function(options) {
		this.options = $.extend({}, this.options, options);
		this.fields = this.fetchField();
	};

	p.fetchField = function() {
		var scope = this;
		var $selector;
		var fields = [];
		if (this.$form.hasClass('radio')) {
			$selector = this.$form.find('input[type=radio]');
			if ($selector.length > 0) {
				$selector.each(function(index, el) {
					el.skinMe = helperMethods.setVariables(el, scope.$form);
					el.skinMe.type = "radio";
                    privateMethods.removeEventCommons(el.skinMe);
                    privateMethods.removeEventRadio(el.skinMe);
                    privateMethods.addEventCommons(el.skinMe);
					privateMethods.addEventRadio(el.skinMe);
					fields.push(el);
				});
			}
		}

		if (this.$form.hasClass('checkbox')) {
			$selector = this.$form.find('input[type=checkbox]');
			if ($selector.length > 0) {
				$selector.each(function(index, el) {
					el.skinMe = helperMethods.setVariables(el, scope.$form);
					el.skinMe.type = "checkbox";
                    privateMethods.removeEventCommons(el.skinMe);
                    privateMethods.removeEventCheckbox(el.skinMe);
					privateMethods.addEventCommons(el.skinMe);
					privateMethods.addEventCheckbox(el.skinMe);
					fields.push(el);
				});
			}
		}

		if (this.$form.hasClass('select')) {
			$selector = this.$form.find('select').not('[me\\:skin=disabled]');
			if ($selector.length > 0) {
				$selector.each(function(index, el) {
					el.skinMe = helperMethods.setSelectVariables(el, scope.$form);
					el.skinMe.type = "select";
                    privateMethods.removeEventSelect(el.skinMe);
                    privateMethods.addEventSelect(el.skinMe);
					fields.push(el);

                    $(el).val($(el).find('option[data-default="true"]').val()).trigger('change');
				});
			}
		}

		this.$form.addClass('activated');
		return fields;
	};

    p.updateFields = function() {
        var scope = this;
        var $selector;

        if (this.$form.hasClass('radio')) {
            $selector = this.$form.find('input[type=radio]');
            if ($selector.length > 0) {
                $selector.each(function(index, el) {
                    if (scope.fields.indexOf(el) !== -1) {
                        return true;
                    }

                    scope.addRadioField(el);
                });
            }
        }

        if (this.$form.hasClass('checkbox')) {
            $selector = this.$form.find('input[type=checkbox]');
            if ($selector.length > 0) {
                $selector.each(function(index, el) {
                    if (scope.fields.indexOf(el) !== -1) {
                        return true;
                    }

                    scope.addCheckboxField(el);
                });
            }
        }

        if (this.$form.hasClass('select')) {
            $selector = this.$form.find('select').not('[me\\:skin=disabled]');
            if ($selector.length > 0) {
                $selector.each(function(index, el) {
                    if (scope.fields.indexOf(el) !== -1) {
                        return true;
                    }

                    scope.addSelectField(el);
                });
            }
        }
    };

	p.addField = function(field) {
        var $selector = this.$form.find('[name="' + field.name + '"]');

        if ($selector.length === 0) {
            return false;
        }

        var scope = this;

        $selector.each(function(index, element) {
            var needTreatment = false;
            var $element = $(element);

            if (
                ($element.is('input[type="radio"]') && scope.$form.hasClass('radio'))
                || ($element.is('input[type="checkbox"]') && scope.$form.hasClass('checkbox'))
                || ($element.is('select') && !$element.is('[me\\:skin="disabled"]') && scope.$form.hasClass('select'))
            ) {
                needTreatment = true;
            }

            if (!needTreatment || scope.fields.indexOf(element) !== -1) {
                return true;
            }

            if ($element.is('input[type="radio"]')) {
				scope.addRadioField(element)
            } else if ($element.is('input[type="checkbox"]')) {
				scope.addCheckboxField(element);
            } else if ($element.is('select')) {
                scope.addSelectField(element);
            }
        });
    };

    p.addRadioField = function(element) {
        element.skinMe = helperMethods.setVariables(element, this.$form);
        element.skinMe.type = "radio";
        privateMethods.removeEventCommons(element.skinMe);
        privateMethods.removeEventRadio(element.skinMe);
        privateMethods.addEventCommons(element.skinMe);
        privateMethods.addEventRadio(element.skinMe);

        this.fields.push(element);
    };

    p.addCheckboxField = function(element) {
        element.skinMe = helperMethods.setVariables(element, this.$form);
        element.skinMe.type = "checkbox";
        privateMethods.removeEventCommons(element.skinMe);
        privateMethods.removeEventCheckbox(element.skinMe);
        privateMethods.addEventCommons(element.skinMe);
        privateMethods.addEventCheckbox(element.skinMe);

        this.fields.push(element);
    };

    p.addSelectField = function(element) {
	    var $element = $(element);

        element.skinMe = helperMethods.setSelectVariables(element, this.$form);
        element.skinMe.type = "select";
        privateMethods.removeEventSelect(element.skinMe);
        privateMethods.addEventSelect(element.skinMe);

        $element.val($element.find('option[data-default="true"]').val()).trigger('change');

        this.fields.push(element);
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

			obj.$choice = null;
			if (obj.$skm){
				obj.$choice = obj.$skm.find('.skinme-select-choices');
			}

            //
			// if(isMobile.any()){
			// 	obj.$el.addClass('native');
			// }
            //
			// obj.native = (obj.$el.hasClass('native'));
			return obj;
		}
	};

	var privateMethods = {
		addEventCommons: function(element){
			element.$cz.on('mouseenter', function(e) {
				if (element.$el.attr('disabled')) {return;}
				element.$skm.addClass('hover');
			});

			element.$cz.on('mouseleave', function(e) {
				if (element.$el.attr('disabled')) {return;}
				element.$skm.removeClass('hover');
			});
		},
		addEventRadio: function(element) {
            if (element.el.checked) {
				element.$skm.addClass('active');
				element.$el.addClass('checked');
			}

			element.$el.on('change', function skinMeRadioChangeHandler(e, from) {
				if (!element.$el.hasClass('checked')) {

					$.each(element.$form.find('input[name="' + element.name + '"]'), function(index, el){
						var skinMe = el.skinMe;
                        element.$form.find('#' + skinMe.$skm[0].id).removeClass('active');
						skinMe.$el.removeClass('checked');
						skinMe.el.checked = false;
					});

                    element.$form.find('#' + element.$skm[0].id).addClass('active');
					element.$el.addClass('checked');
					element.el.checked = true;
				}
			});


			element.$cz.on('click', function skinMeRadioCzHandler(e) {
				if (element.$el.attr('disabled')) {return;}
				e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
				element.$el.trigger('change', 'cz');
			});

			if (element.$label) {
				element.$label.on('click', function skinMeRadioLabelHandler(e) {
                    if (element.$el.attr('disabled')) {return;}
					e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    element.$el.trigger('change', 'label');
				});
			}
		},
		addEventCheckbox: function(element) {
			if (element.el.checked) {
				element.$skm.addClass('active');
				element.$el.addClass('checked');
			}

			element.$el.on('change', function skinMeCheckboxChangeHandler(e, from) {
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

			element.$cz.on('click', function skinMeCheckboxCzHandler(e) {
				if (element.$el.attr('disabled')) {return;}
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
				element.$el.trigger('change', 'cz');
                Me.dispatch.emit(element.$el.attr('id'), element.$el);
			});

			if (element.$label) {
				element.$label.on('click', function skinMeCheckboxLabelHandler(e) {
					if (element.$el.attr('disabled')) {return;}
                    e.stopImmediatePropagation();
                    e.stopPropagation();
					e.preventDefault();
					element.$el.trigger('change', 'label');
                    Me.dispatch.emit(element.$el.attr('id'), element.$el);
				});
			}
		},
		addEventSelect: function(element) {
            element.$active.html(element.$el.find('option[value="' + element.el.value + '"]').text());
			element.$el.on('change', function skinMeSelectChangeHandler(e, from) {

                var index = element.el.selectedIndex;
				element.$skm.find('.choice').removeClass('selected');
				element.$skm.find('.choice').eq(index).addClass('selected');
				if (element.$el.find('option[value="' + element.el.value + '"]').length > 0) {

					// element.$active.html(element.$el.find('option[value="' + element.el.value + '"]')[0].text);
                    element.$active.html(element.$choice.find('.choice[data-value="' + element.el.value + '"]').html());
				}

				//IF CHOICE SELECTED ADD ACTIVE CLASS TO CHANGE CSS TO DEMONSTRATE THAT ITS SELECTED
			});

			element.selectItemByValue = function(element, value) {
				var el = element.el;
				for(var i=0; i < el.options.length; i++) {
					$(el.options[i]).attr('selected', false);
					if (el.options[i].value == value) {
						el.selectedIndex = i;
						$(el.options[i]).attr('selected', true);
					}
				}
				element.$el.trigger('change');
			};

			element.selectItemByIndex = function(element, index) {
				var el = element.el;
				for(var i=0; i < el.options.length; i++) {
					$(el.options[i]).attr('selected', false);
					if (i == index) {
						el.selectedIndex = i;
						$(el.options[i]).attr('selected', true);
					}
				}
				element.$el.trigger('change');
			};

			if (!element.native) {
				element.$skm.on('mouseenter', function(e) {
					e.preventDefault();
					if (element.$el.attr('disabled')) {return;}
					element.$skm.addClass('hover');
				});

				element.$skm.on('mouseleave', function(e) {
					e.preventDefault();
					if (element.$el.attr('disabled')) {return;}
					element.$skm.removeClass('hover');
				});

                element.$skm.parent().on('mouseleave', function(e) {
					e.preventDefault();
					element.$skm.removeClass('opened');
					element.$skm.find('.open').removeClass('open');
				});

				element.$mask.on('click', function skinMeSelectClickHandler(e) {
                    e.preventDefault();

					if (element.$el.attr('disabled')) {return;}
					if(!element.$choice.hasClass('open')){
						e.stopPropagation();

                        element.$el.click();
						// open custom choices
						element.$skm.addClass('opened');
						element.$choice.addClass('open');
					}

					$(document).on('click.skinMe', function closeHander(e) {
						e.preventDefault();
						if (element.$el.attr('disabled')) {return;}
						if(element.$choice.hasClass('open')){
							element.$skm.removeClass('opened');
							element.$choice.removeClass('open');
						}
						$(document).off('click.skinMe');
					});
				});

				// select custom choices
				element.$choice.find('.choice').on('click',function selectChangeHandler(e) {
					e.preventDefault();

					if (element.$el.attr('disabled')) {return;}

					var value = $(e.currentTarget).html();
					var index = $(e.currentTarget).index();

					element.selectItemByIndex(element, index);
				});
			}
		},
        removeEventCommons: function(element){
            element.$cz.off('mouseenter');
            element.$cz.off('mouseleave');
        }, 
        removeEventRadio: function(element){
            element.$el.off('change');
            element.$cz.off('click');

            if (element.$label) {
                element.$label.off('click');
            }
        },
        removeEventCheckbox: function(element){
            element.$el.off('change');
            element.$cz.off('click');

            if (element.$label) {
                element.$label.off('click');
            }
        },
        removeEventSelect: function(element){
            element.$el.off('change');

            if (!element.native) {
                element.$skm.off('mouseenter');
                element.$skm.off('mouseleave');
                element.$skm.parent().off('mouseleave');
                element.$mask.off('click');
                element.$choice.find('.choice').off('click');
            }
        }
	};

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	if(!window.Me) {
		window.Me = {};
	}
	Me.skin = SkinMe;
}(jQuery, window, document));