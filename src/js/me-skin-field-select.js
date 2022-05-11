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
	}
	
	initialize() {
		super.initialize();
		this.setDefault();

		if(this.skinChoicesWrapper.hasAttribute('data-scrollbar') && Scrollbar){
			let option = (this.skinChoicesWrapper.hasAttribute('data-scrollbar-options')) ? JSON.parse(this.skinChoicesWrapper.getAttribute('data-scrollbar-options')) : {};
			Scrollbar.init(this.skinChoicesWrapper, option);
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
		})
		this.field.setAttribute('tabindex', -1);
	}
	setCustomVariables(){
		if (this.customSkin){
			this.defaults = this.field.querySelector(`option[default]`);
			this.selected = this.field.querySelector(`option[selected]`);
			this.selection = this.field.parentNode.querySelector(`[me\\:skin\\:selection="${this.ID}"]`);
			this.wrapper = this.field.parentNode;
		}

		if((navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i))){
			this.field.addClass(this.classes.native);
		}

		this.isNative = (this.field.classList.contains(this.classes.native));
	}
	addEventWhenOpen(){
		let scope = this;

		document.addEventListener('click', this.close.bind(this));
		this.skinChoicesWrapper.querySelectorAll('.choice').forEach((value, index)=>{
			value.addEventListener('keydown', scope.keydownOnChoice.bind(scope));
			value.addEventListener('click', scope.handleSelection.bind(scope));
		});
	}
	keydownOnChoice(e){
		if(e.keyCode === 13){this.handleSelection(e)}
		if(e.keyCode === 9){this.close();}
	}
	removeEventOnClose(){
		let scope = this;

		document.removeEventListener('click', this.close.bind(this));
		this.skinChoicesWrapper.querySelectorAll('.choice').forEach((value, index)=>{
			value.removeEventListener('keydown', scope.keydownOnChoice.bind(scope));
			value.removeEventListener('click', scope.handleSelection.bind(scope));
		});
	}
	addCustomEvents(){
		window.addEventListener('resize', ()=>{
			if (this.isOpen) {
				this.close();
			}
		});

		this.field.addEventListener('change', this.handleChange.bind(this));

		if(!this.isNative){
			this.customSkin.addEventListener('click', this.handleState.bind(this));

			if (this.label) {
				this.label.addEventListener('click', this.handleState.bind(this));
			}
		}
	}
	removeCustomEvents(){
		window.removeEventListener("resize", ()=>{
			if (this.isOpen) {
				this.close();
			}
		});
		this.field.removeEventListener('change', this.handleChange.bind(this));

		if(!this.isNative){
			this.customSkin.removeEventListener('click', this.handleState.bind(this));

			if (this.label) {
				this.label.removeEventListener('click', this.handleState.bind(this));
			}
		}
	}
	handleChange(e){
		this.choiceSelected = this.skinChoicesWrapper.querySelectorAll('.choice')[this.getSelectedIndex()];
		this.skinChoicesWrapper.querySelectorAll('.choice').forEach((value,nodeIndex)=>{
			value.setAttribute('selected', false);

			if(nodeIndex === this.getSelectedIndex()){
				value.setAttribute('selected',true);
			}
		})

		this.updateHtml();
		if(this.isOpen){
			this.close();
		}
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
	open(){
		if (this.field.disabled || this.isAnimating) {return;}

		let selects = document.querySelectorAll('select:not('+ this.field.getAttribute('name') + ')');
		selects.forEach(function (value, index) {
			let field = Me.skin.getField(value);

			if(field){
				field.close();
			}
		});

		this.isAnimating = true;
		this.skinChoicesWrapper.style.height = this.choicesHeight();
		this.wrapper.classList.add(this.classes.opening);
		this.wrapper.addEventListener('transitionend', this.handleEndOpenTransition.bind(this));
		this.addEventWhenOpen();
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
		this.wrapper.addEventListener('transitionend', this.handleEndCloseTransition.bind(this));
		this.removeEventOnClose();
	}
	handleEndOpenTransition(e){
		this.wrapper.classList.add(this.classes.open);
		this.wrapper.classList.remove(this.classes.opening);
		this.wrapper.removeEventListener('transitionend', this.handleEndOpenTransition.bind(this));
		this.isAnimating = false;
		this.skinChoicesWrapper.querySelectorAll('.choice')[this.getSelectedIndex()].focus();
	}
	handleEndCloseTransition(e){
		this.wrapper.classList.remove(`${this.classes.open}`, `${this.classes.closing}`);
		this.wrapper.removeEventListener('transitionend', this.handleEndCloseTransition.bind(this));
		this.isAnimating = false;
	}
	handleSelection(e){
		e.preventDefault();
		this.setSelection(Array.from(event.target.parentNode.children).indexOf(event.target));
	}
	setSelection(index = 0, preventTrigger){
		this.field.querySelectorAll('option').forEach((value,nodeIndex)=>{
			value.setAttribute('selected', false);
			if(nodeIndex === index){
				value.setAttribute('selected','selected');
				this.field.value = value.getAttribute('value');

				if(!preventTrigger){
					this.field.dispatchEvent(new Event('change'));
				} else{
					this.updateHtml();
				}
			}
		});


	}
	getSelectedIndex(){
		let selectedEl = this.field.querySelector('option[value="'+ this.field.value +'"]');
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
					let focusChoiceIndex = Array.from(this.customSkin.querySelector(':focus').parentNode.children).indexOf(this.customSkin.querySelector(':focus'));
					let elToFocus = this.skinChoicesWrapper.querySelectorAll('.choice')[focusChoiceIndex + direction];

					if(elToFocus){
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
