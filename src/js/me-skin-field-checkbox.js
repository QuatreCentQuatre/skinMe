class SkinCheckbox extends SkinField{
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
			this.$customSkin.addClass(this.classes.checked);
			this.$field.addClass(this.classes.checked);
			this.field.checked = true;
		} else {
			this.$customSkin.removeClass(this.classes.checked);
			this.$field.removeClass(this.classes.checked);
			this.field.checked = false;
		}
	}
	clickHandler(e) {
		if (this.disabled) {return;}
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		this.$field.trigger('change.skinMe');
	}

	keyHandler(e) {
		super.keyHandler(e);

		if(e.keyCode === 13 || e.keyCode === 32)
			this.$customSkin.trigger('click.skinMe');
	}

	set disabled(bool){
		super.disabled = bool;

		if(this.field.checked){
			this.changeHandler();
		}
	}
}

Me.skinTypes['SkinCheckbox'] = SkinCheckbox;