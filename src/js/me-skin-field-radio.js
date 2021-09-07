class SkinRadio extends SkinField{
	constructor(options){
		super(options);
		this.classes = {
			checked: 'is-checked'
		}
	}
	addCustomEvents(){
		this.$field.on('change.skinMe', (e) => {this.changeHandler(e)});
		this.$customSkin.on('click.skinMe', (e) => {this.clickHandler(e)});

		if (this.$label) {
			this.$label.on('click.skinMe', (e) => {this.clickHandler(e)});
		}
	}
	removeCustomEvents(){
		this.$field.off('change.skinMe');
		this.$customSkin.off('click.skinMe');

		if (this.$label) {
			this.$label.off('click.skinMe');
		}
	}
	changeHandler(e){
		if (!this.field.checked) {
			jQuery.each(jQuery('input[name="' + this.name + '"]'), (index, el)=>{
				let field = Me.skin.getField(jQuery(el));
				field.$customSkin.removeClass(this.classes.checked);
				field.$field.removeClass(this.classes.checked);
				field.field.checked = false;
			});

			this.$customSkin.addClass(this.classes.checked);
			this.$field.addClass(this.classes.checked);
			this.field.checked = true;
		}
	}
	clickHandler(e) {
		if (this.field.disabled || e.target.tagName === 'A') {return;}
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();
		this.$field.trigger('change', 'label');
	}

	keyHandler(e) {
		super.keyHandler(e);

		if(e.keyCode === 13 || e.keyCode === 32)
			this.$customSkin.trigger('click');
	}
}

Me.skinTypes['SkinRadio'] = SkinRadio;