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

if (!window.Me.skinType){
	Me.skinTypes = [];
}


class SkinField {
	constructor(options){
		this.field 			= options.field;

		this.ID 			= this.field.getAttribute('id');
		this.name 			= this.field.getAttribute('name');
		this.type 			= (this.field.hasAttribute('type')) ? this.field.getAttribute('type') : this.field.tagName.toLowerCase();

		this.label 		= (this.field.parentElement.querySelector('label[for="' + this.ID + '"]')) ? this.field.parentElement.querySelector('label[for="' + this.ID + '"]') : null;
		this.customSkin 	= (this.field.parentElement.querySelector(`[me\\:skin\\:id="${this.ID}"]`)) ? this.field.parentElement.querySelector(`[me\\:skin\\:id="${this.ID}"]`) : null;

		if(!this.dependenciesExist() || !this.requirementsExist())
			return;

		this.options 		= {debug: (window.SETTINGS && SETTINGS.DEBUG_MODE) ? SETTINGS.DEBUG_MODE : false};
	}

	initialize(){
		// Set common variables used by every field type
		this.setDOMAttr();
		this.setCustomVariables();

		if(!this.customSkin)
			return;

		// this.removeCommonEvents();
		this.addCommonEvents();
		//
		// Add specific variables depending of the field type
		this.removeCustomEvents();
		this.addCustomEvents();

		this.setInitialValue();
	}
	addCommonEvents(){
		this.customSkin.addEventListener('mouseenter', this.toggleHover.bind(this));
		this.customSkin.addEventListener('mouseleave', this.toggleHover.bind(this));
		this.customSkin.addEventListener('keydown', this.keyHandler.bind(this));
	}
	removeCommonEvents(){
		this.customSkin.removeEventListener('mouseenter', this.toggleHover.bind(this));
		this.customSkin.removeEventListener('mouseleave', this.toggleHover.bind(this));
		this.customSkin.removeEventListener('keydown', this.keyHandler.bind(this));
	}
	setDOMAttr(){
		this.field.setAttribute('me:skin:render', "true");
		this.field.setAttribute('me:skin:type', this.type);
		this.customSkin.setAttribute('me:skin:render', "true");
		this.customSkin.setAttribute('me:skin:disabled', this.field.disabled);

		if(!this.field.disabled){
			this.customSkin.setAttribute('tabindex', 0);
		}
	}
	dependenciesExist(){
		let isValid = true;

		// @NOTE Only here in case some dependencies needs to be added in a near future
		return isValid;
	}

	requirementsExist(){
		let isValid = true;

		if(!this.customSkin){
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
		if (this.field.hasAttribute('disabled') && this.field.getAttribute('disabled')) {return;}
		this.customSkin.classList.toggle('hover');
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

		this.field.setAttribute('disabled', bool);
		this._disabled = bool;

		if(this.customSkin){
			this.customSkin.setAttribute('me:skin:disabled', bool);

			if(bool === true){
				this.customSkin.setAttribute('tabindex', -1);
			} else{
				this.customSkin.setAttribute('tabindex', 0);
			}
		}
	}

	// Those functions need to be overwrite by each type of field
	setCustomVariables(){}
	addCustomEvents(){}
	removeCustomEvents(){}
	setInitialValue(){}
	keyHandler(e){}
	terminate(){
		this.removeCustomEvents();
		this.removeCommonEvents();
	}
}