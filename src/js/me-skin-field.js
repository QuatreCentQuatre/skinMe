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

if (!window.Me.skinType){
	Me.skinTypes = [];
}


class SkinField {
	constructor(options){
		this.field 			= options.field;
		this.$field 		= jQuery(options.field);

		this.ID 			= this.$field.attr('id');
		this.name 			= this.$field.attr('name');
		this.type 			= (this.$field.attr('type')) ? this.$field.attr('type') : this.$field.prop("tagName").toLowerCase();
		this.disabled 		= !!this.$field.attr('disabled');

		this.$label 		= (this.$field.parent().find('label[for="' + this.ID + '"]').length > 0) ? this.$field.parent().find('label[for="' + this.ID + '"]') : null;
		this.$customSkin 	= (this.$field.parent().find(`[me\\:skin\\:id="${this.ID}"]`).length > 0) ? this.$field.parent().find(`[me\\:skin\\:id="${this.ID}"]`) : null;

		if(!this.dependenciesExist() || !this.requirementsExist())
			return;

		this.options 		= {debug: (window.SETTINGS && SETTINGS.DEBUG_MODE) ? SETTINGS.DEBUG_MODE : false};
	}

	initialize(){
		// Set common variables used by every field type
		this.setDOMAttr();
		this.setCustomVariables();

		if(!this.$customSkin)
			return;

		this.removeCommonEvents();
		this.addCommonEvents();

		// Add specific variables depending of the field type
		this.removeCustomEvents();
		this.addCustomEvents();

		this.setInitialValue();
	}
	addCommonEvents(){
		this.$customSkin.on('mouseenter.skinMe mouseleave.skinMe', (e) => {this.toggleHover(e)});
		this.$customSkin.on('keydown.skinMe',(e) => {this.keyHandler(e)});
	}
	removeCommonEvents(){
		this.$customSkin.off('mouseenter.skinMe mouseleave.skinMe');
		this.$customSkin.off('keydown.skinMe');
	}
	setDOMAttr(){
		this.$field.attr('me:skin:render', "true");
		this.$field.attr('me:skin:type', this.type);
		this.$customSkin.attr('me:skin:render', "true");
		this.$customSkin.attr('me:skin:disabled', this.disabled);

		this.$customSkin.attr('me:skin:theme', this.$field.attr('me:skin:theme'));
		this.$field.removeAttr('me:skin:theme');

		if(!this.disabled){
			this.$customSkin.attr('tabindex', 0);
		}
	}
	dependenciesExist(){
		let isValid = true;

		if (!window.$) {
			console.warn(`SkinMe :: Dependencies :: required jquery (http://jquery.com/)`);
			isValid = false;
		}

		return isValid;
	}

	requirementsExist(){
		let isValid = true;

		if(!this.$customSkin){
			console.error(`Skin element associated with ID:${this.ID} can't be found. Add me:skin:id="${this.ID}"`);
			isValid = false;
		}

		if(!this.ID){
			console.error(`ID attribute must be defined on the native field`);
			isValid = false;
		}

		return isValid;
	}

	toggleHover(e){
		if (this.$field.attr('disabled')) {return;}
		this.$customSkin.toggleClass('hover');
	}

	get name(){
		return this._name;
	}

	set name(name){
		if(typeof name !== "string"){
			console.error('The name parameter must be a string');
			return;
		}

		if(name){
			this._name = name;
		}
	}

	get type(){
		return this._type;
	}

	set type(type){
		if(typeof type !== "string"){
			console.error('The type parameter must be a string');
			return;
		}

		if(type){
			this._type = type;
		}
	}

	get ID(){
		return this._ID;
	}

	set ID(ID){
		if(typeof ID !== "string"){
			console.error('The ID parameter must be a string');
			return;
		}

		if(ID){
			this._ID = ID;
		}
	}

	get options(){
		return this._options;
	}

	set options(params){
		this._options = params;
	}

	get disabled(){
		return this._disabled;
	}

	set disabled(bool){
		if(typeof bool !== "boolean"){
			console.error('The bool parameter must be a boolean');
			return;
		}

		this.$field.attr('disabled', bool);
		this._disabled = bool;

		if(this.$customSkin){
			this.$customSkin.attr('me:skin:disabled', bool);

			if(bool === true){
				this.$customSkin.attr('tabindex', -1);
			} else{
				this.$customSkin.attr('tabindex', 0);
			}
		}
	}

	// Those functions need to be overwrite by each type of field
	setCustomVariables(){}
	addCustomEvents(){}
	removeCustomEvents(){}
	setInitialValue(){}
	keyHandler(e){}
}