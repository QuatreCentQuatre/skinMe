class SkinSelect extends SkinField{
	constructor(options){
		super(options);
		this.preventDefaultChangeEvent = this.field.hasAttribute('me:skin:prevent-default');
		this.skinChoicesWrapper = this.field.parentNode.querySelector(`[me\\:skin\\:choices="${this.ID}"]`);
		this.choiceSelected = this.skinChoicesWrapper.querySelector('.choice[selected]');
		this.isAnimating = false;

		this.classes = {
			opening: 'is-opening',
			closing: 'is-closing',
			open: 'is-open',
			native: 'is-native'
		}

		_.bindAll(this, ['close','keydownOnChoice','handleSelection','handleResize','handleChange','handleState', 'handleEndOpenTransition', 'handleEndCloseTransition'])
	}
	
	initialize() {
		super.initialize();
		this.setDefault();

		if(this.skinChoicesWrapper.hasAttribute('data-scrollbar') && Scrollbar){
			let option = (this.skinChoicesWrapper.hasAttribute('data-scrollbar-options')) ? JSON.parse(this.skinChoicesWrapper.getAttribute('data-scrollbar-options')) : {};
			this.scrollbar = Scrollbar.init(this.skinChoicesWrapper, option);
		}
	}

	setDefault(){
		if(this.defaults){
			this.skinChoicesWrapper.querySelectorAll('.choice')[Array.from(this.defaults.parentNode.children).indexOf(this.defaults)].setAttribute('default', true);
		}
	}
	setInitialValue(){
		if(this.selected){
			this.setSelection(Array.from(this.selected.parentNode.children).indexOf(this.selected), this.preventDefaultChangeEvent);
		} else{
			this.setSelection(0, this.preventDefaultChangeEvent);
		}
	}

	setDOMAttr(){
		super.setDOMAttr();
		this.field.parentNode.setAttribute('me:skin:wrapper', this.ID);
		this.field.removeAttribute('me:skin:type');
		this.field.parentNode.setAttribute('me:skin:type', this.type);
		this.skinChoicesWrapper.querySelectorAll('.choice').forEach((value, key)=>{
			value.setAttribute('tabindex', -1);

			if(key === this.skinChoicesWrapper.querySelectorAll('.choice') - 1){
				this.field.setAttribute('tabindex', -1);
			}
		})
	}
	setCustomVariables(){
		if (this.customSkin){
			this.defaults = this.field.querySelector(`option[default]`);
			this.selected = this.field.querySelector(`option[selected]`);
			this.selection = this.field.parentNode.querySelector(`[me\\:skin\\:selection="${this.ID}"]`);
			this.wrapper = this.field.parentNode;
		}
	}
	addEventWhenOpen(){
		let scope = this;

		document.addEventListener('click', this.close);
		this.skinChoicesWrapper.querySelectorAll('.choice').forEach((value, index)=>{
			value.addEventListener('keydown', scope.keydownOnChoice);
			value.addEventListener('click', scope.handleSelection);
		});
	}
	keydownOnChoice(e){
		if(e.keyCode === 13){this.handleSelection(e)}
		if(e.keyCode === 9){this.close();}
	}
	removeEventOnClose(){
		document.removeEventListener('click', this.close);
		this.skinChoicesWrapper.querySelectorAll('.choice').forEach((value, index)=>{
			value.removeEventListener('keydown', this.keydownOnChoice);
			value.removeEventListener('click', this.handleSelection);
		});
	}
	addCustomEvents(){
		window.addEventListener('resize', this.handleResize);

		this.field.addEventListener('change', this.handleChange);

		this.customSkin.addEventListener('click', this.handleState);

		if (this.label) {
			this.label.addEventListener('click', this.handleState);
		}
	}
	removeCustomEvents(){
		window.removeEventListener("resize", this.handleResize);
		this.field.removeEventListener('change', this.handleChange);
	}
	handleChange(e){
		this.skinChoicesWrapper.querySelectorAll('.choice').forEach((value,nodeIndex)=>{
			value.removeAttribute('selected');

			if(nodeIndex === this.getSelectedIndex()){
				value.setAttribute('selected',true);
			}

			if(nodeIndex === this.skinChoicesWrapper.querySelectorAll('.choice').length - 1){
				this.choiceSelected = this.skinChoicesWrapper.querySelectorAll('.choice')[this.getSelectedIndex()];
				this.updateHtml();
				if(this.isOpen){
					this.close();
				}
			}
		});
	}
	handleState(e){
		if (this.field.disabled) {return;}

		e.preventDefault();

		if(this.isOpen){
			this.close();
			return;
		}

		this.open();
	}
	handleResize(){
		if (this.isOpen) {
			this.close();
		}
	}
	open(){
		if (this.field.disabled || this.isAnimating) {return;}

		let selects = document.querySelectorAll('select:not('+ this.field.getAttribute('name') + ')');
		selects.forEach( (value, index)=>{
			let field = Me.skin.getField(value);

			if(field){
				field.close();
			}

			if(index === selects.length - 1){
				this.isAnimating = true;
				this.skinChoicesWrapper.style.height = this.choicesHeight();
				this.wrapper.classList.add(this.classes.opening);
				this.wrapper.addEventListener('transitionend', this.handleEndOpenTransition);
				this.addEventWhenOpen();
			}
		});


	}
	close(e){
		if (this.field.disabled || this.isAnimating) {return;}

		if(e)
			e.preventDefault();

		if(this.isOpen){
			this.isAnimating = true;
		}

		this.skinChoicesWrapper.style.height = '0px';
		this.wrapper.classList.add(this.classes.closing);
		this.wrapper.addEventListener('transitionend', this.handleEndCloseTransition);
		this.removeEventOnClose();
	}
	handleEndOpenTransition(e){
		this.wrapper.classList.add(this.classes.open);
		this.wrapper.classList.remove(this.classes.opening);
		this.wrapper.removeEventListener('transitionend', this.handleEndOpenTransition);
		this.isAnimating = false;

		if(!this.scrollbar){
			this.skinChoicesWrapper.querySelectorAll('.choice')[this.getSelectedIndex()].focus();
		}
	}
	handleEndCloseTransition(e){
		this.wrapper.classList.remove(`${this.classes.open}`, `${this.classes.closing}`);
		this.wrapper.removeEventListener('transitionend', this.handleEndCloseTransition);
		this.isAnimating = false;
	}
	handleSelection(e){
		e.preventDefault();
		this.setSelection(Array.from(e.target.parentNode.children).indexOf(e.target), false);
	}
	setSelection(index = 0, preventTrigger){
		this.field.querySelectorAll('option').forEach((value,nodeIndex)=>{
			value.removeAttribute('selected');
			if(nodeIndex === index){
				value.setAttribute('selected','selected');

				if(!preventTrigger){
					this.field.dispatchEvent(new Event('change'));
				} else{
					this.handleChange();
				}
			}
		});
	}
	getSelectedIndex(){
		let selectedEl = this.field.querySelector('option[selected="selected"]');
		return Array.from(selectedEl.parentNode.children).indexOf(selectedEl);
	}
	updateHtml(){
		this.selection.textContent = this.choiceSelected.textContent;
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
					let focusChoiceIndex = (this.customSkin.querySelector(':focus')) ? Array.from(this.customSkin.querySelector(':focus').parentNode.children).indexOf(this.customSkin.querySelector(':focus')) : 0;
					let elToFocus = this.skinChoicesWrapper.querySelectorAll('.choice')[focusChoiceIndex + direction];

					if(elToFocus){
						if(this.scrollbar){
							this.scrollbar.scrollIntoView(elToFocus);
						}

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

	requirementsExist(){
		let isValid = super.requirementsExist();

		if(!document.querySelector(`[me\\:skin\\:choices="${this.ID}"]`)){
			console.error(`Can't find the associated me:skin:choices attribute linked to field. See me:skin:choices in README.md`)
		}

		if(!document.querySelector(`[me\\:skin\\:selection="${this.ID}"]`)){
			console.error(`Can't find the associated me:skin:selection attribute linked to field. See me:skin:selection in README.md`)
		}

		return isValid;
	}

	choicesHeight(){
		let height = 0;

		this.skinChoicesWrapper.querySelectorAll('.choice').forEach((value, index) => {
			height += value.offsetHeight;
		});

		return `${height}px`;
	}

	get isOpen(){
		return this.wrapper.classList.contains(this.classes.open);
	}
}

Me.skinTypes['SkinSelect'] = SkinSelect;
