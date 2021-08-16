class SkinSelect extends SkinField{
	constructor(options){
		super(options);
		this.preventDefaultChangeEvent = this.$field[0].hasAttribute('me:skin:prevent-default');
		this.$skinChoicesWrapper = this.$field.parent().find(`[me\\:skin\\:choices="${this.ID}"]`);
		this.$choiceSelected = this.$skinChoicesWrapper.find('.choice[selected]');
		this.isAnimating = false;
		
		this.classes = {
			opening: 'is-opening',
			closing: 'is-closing',
			open: 'is-open',
			native: 'is-native'
		}
	}
	
	initialize() {
		super.initialize();
		this.setDefault();
	}
	
	setDefault(){
		this.$defaults.each((index, value)=>{
			jQuery(this.$skinChoicesWrapper.find('.choice')[this.$field.find('option[value="'+ $(value).val() +'"]').index()]).attr('default', true);
		});
	}
	setInitialValue(){
		if(this.$selected.length > 0){
			this.setSelection(this.$selected.index(), this.preventDefaultChangeEvent);
		} else{
			this.setSelection(0, this.preventDefaultChangeEvent);
		}
	}
	
	setDOMAttr(){
		super.setDOMAttr();
		this.$field.parent().attr('me:skin:wrapper', this.ID);
		this.$field.removeAttr('me:skin:type');
		this.$field.parent().attr('me:skin:type', this.type);
		this.$skinChoicesWrapper.find('.choice').attr('tabindex', -1);
		this.$field.attr('tabindex', -1);
	}
	setCustomVariables(){
		if (this.$customSkin){
			this.$defaults = this.$field.find(`option[default]`);
			this.$selected = this.$field.find(`option[selected]`);
			this.$selection = this.$field.parent().find(`[me\\:skin\\:selection="${this.ID}"]`);
			this.$wrapper = this.$field.parent();
		}
		
		if(Me.detect && Me.detect.isMobile()){
			this.$field.addClass(this.classes.native);
		}
		
		this.isNative = (this.$field.hasClass(this.classes.native));
	}
	addEventWhenOpen(){
		jQuery(document).on('click.skinMe', (e) => {this.close(e)});
		this.$skinChoicesWrapper.find('.choice').on('keydown.skinMe', (e)=>{
			if(e.keyCode === 13){this.handleSelection(e)}
			if(e.keyCode === 9){this.close();}
		});
		this.$skinChoicesWrapper.find('.choice').on('click.skinMe', (e) => {this.handleSelection(e)});
	}
	removeEventOnClose(){
		jQuery(document).off('click.skinMe');
		this.$skinChoicesWrapper.find('.choice').off('keydown.skinMe');
		this.$skinChoicesWrapper.find('.choice').off('click.skinMe');
	}
	addCustomEvents(){
		window.addEventListener('resize', ()=>{
			if (this.isOpen) {
				this.close();
			}
		});
		this.$field.on('change.skinMe', (e) => {this.handleChange(e)});
		
		if(!this.isNative){
			this.$customSkin.on('click.skinMe', (e) => {this.handleState(e)});
			
			if (this.$label) {
				this.$label.on('click.skinMe', (e) => {this.handleState(e)});
			}
		}
	}
	removeCustomEvents(){
		window.removeEventListener("resize", ()=>{
			if (this.isOpen) {
				this.close();
			}
		});
		this.$field.off('change.skinMe');
		
		if(!this.isNative){
			this.$customSkin.off('click.skinMe');
			
			if (this.$label) {
				this.$label.off('click.skinMe');
			}
		}
	}
	handleChange(e){
		this.$choiceSelected = jQuery(this.$skinChoicesWrapper.find('.choice')[this.getSelectedIndex()]);
		this.$skinChoicesWrapper.find('.choice').attr('selected', false);
		jQuery(this.$skinChoicesWrapper.find('.choice')[this.getSelectedIndex()]).attr('selected', true);
		
		this.updateHtml();
		if(this.isOpen){
			this.close();
		}
	}
	handleState(e){
		if (this.field.disabled) {return;}
		
		e.preventDefault();
		// e.stopPropagation();
		
		if(this.isOpen){
			this.close();
			return;
		}
		
		this.open();
	}
	open(){
		if (this.field.disabled || this.isAnimating) {return;}
		
		let selects = $('select:not('+ this.$field.attr('name') + ')');
		console.log(selects);
		selects.each(function (index, value) {
			Me.skin.getField($(value)).close();
		});
		
		this.isAnimating = true;
		this.$skinChoicesWrapper.outerHeight(this.choicesHeight);
		this.$wrapper.addClass(this.classes.opening).on('transitionend', ()=>{
			this.$wrapper.addClass(this.classes.open).removeClass(this.classes.opening);
			this.$wrapper.off('transitionend');
			this.isAnimating = false;
			jQuery(this.$skinChoicesWrapper.find('.choice')[this.getSelectedIndex()]).focus();
		});
		
		this.addEventWhenOpen();
	}
	close(e){
		if (this.field.disabled || this.isAnimating) {return;}
		
		if(e)
			e.preventDefault();
		
		if(this.isOpen){
			this.isAnimating = true;
		}
		
		this.$skinChoicesWrapper.outerHeight(0);
		this.$wrapper.addClass(this.classes.closing).on('transitionend', ()=>{
			this.$wrapper.removeClass(`${this.classes.open} ${this.classes.closing}`);
			this.$wrapper.off('transitionend');
			this.isAnimating = false;
		});
		
		this.removeEventOnClose();
	}
	handleSelection(e){
		e.preventDefault();
		this.setSelection(jQuery(e.currentTarget).index());
	}
	setSelection(index, preventTrigger){
		this.$field.find('option').attr('selected', false);
		// jQuery(this.$field.find('option')[index]).attr('selected', true); // @NOTE: issue on reset: previously selected value cant be selected anymore
		jQuery(this.$field.find("option")[index])[0].selected = 'selected';
		
		if(!preventTrigger){
			this.$field.trigger('change');
		} else{
			this.updateHtml();
		}
	}
	getSelectedIndex(){
		return this.$field.find('option[value="'+ this.$field.val() +'"]').index();
	}
	updateHtml(){
		this.$selection.html(this.$choiceSelected.html());
	}
	
	keyHandler(e) {
		super.keyHandler(e);
		
		switch (e.keyCode) {
			case 38:
			case 40:
				if(!this.isOpen){
					this.open();
				} else{
					let direction = (e.keyCode === 38) ? -1 : 1;
					let focusChoiceIndex = this.$customSkin.find(':focus').index();
					let elToFocus = this.$skinChoicesWrapper.find('.choice')[focusChoiceIndex + direction];
					
					if(elToFocus){
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
	
	requirementsExist(){
		let isValid = super.requirementsExist();
		
		if(!jQuery(`[me\\:skin\\:choices="${this.ID}"]`).length > 0){
			console.error(`Can't find the associated me:skin:choices attribute linked to field. See me:skin:choices in README.md`)
		}
		
		if(!jQuery(`[me\\:skin\\:selection="${this.ID}"]`).length > 0){
			console.error(`Can't find the associated me:skin:selection attribute linked to field. See me:skin:selection in README.md`)
		}
		
		return isValid;
	}
	
	get choicesHeight(){
		let height = 0;
		
		this.$skinChoicesWrapper.find('.choice').filter(":visible").each((index, value) => {
			height += jQuery(value).outerHeight(true);
		});
		
		return height;
	}
	
	get isOpen(){
		return this.$wrapper.hasClass(this.classes.open);
	}
}

Me.skinTypes['SkinSelect'] = SkinSelect;
