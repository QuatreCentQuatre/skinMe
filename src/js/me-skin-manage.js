class SkinManager {
	constructor(options){
		this.name     	= "SkinManager";
		this.fields   	= [];
		this.options 	= options;
		this.newFields 	= [];
	}

	initFields($rootElement = document.querySelector('html')){
		this.clearFields();

		let fields = $rootElement.querySelectorAll('[me\\:skin]');
		this.newFields = [];

		for (let i = 0; i < fields.length; i++) {
			this.addField(fields[i]);
		}

		// /* Initialize all new fields*/
		for (let j = 0; j < this._newFields.length; j++) {
			this.newFields[j].initialize();
		}
	}

	getField(fieldEl){
		for (let i in this.fields) {
            let field = this.fields[i];

            if(field.ID === fieldEl.getAttribute('id')){
               return field;
            }
        }
	}

	addField(fieldEl, shouldInit = false){
		let fieldType = fieldEl.getAttribute('me:skin');
		let fieldParams = {field: fieldEl, type: fieldType};
		let className = `Skin${fieldType.charAt(0).toUpperCase()}${fieldType.slice(1)}`;

		/* Look if the field is valid */
		if (typeof Me.skinTypes[className] !== "function") {
			console.error(`The skin type ${className} does not exist. Please select one listed in the following array`, Object.keys(Me.skinTypes));
			return;
		}

		/* Look if the field has already been rendered */
		if (fieldEl.getAttribute('me:skin:render')) {return;}

		/* Create instance of the field */
		let field = new Me.skinTypes[className](fieldParams);

		/* Keep reference of the global field in this class */
		this.fields.push(field);

		/* Assign the field in an array to initialize them later */
		this.newFields.push(field);

		if(shouldInit){
			field.initialize();
		}
	}

	clearFields(){
		let activeFields  = [];
		for (let i in this.fields) {
			let field = this.fields[i];

			if(typeof field == "object"){
				if (document.body.contains(field.el)) {
					activeFields.push(field);
				} else {
					field.terminate();
				}
			}
		}

		this.fields = activeFields;
	}

	get name(){
		return this._name;
	}

	set name(name){
		this._name = name;
	}

	set options(params){
		this._options = params;
	}

	get options(){
		return this._options;
	}

	get newFields(){
		return this._newFields;
	}

	set newFields(newFields){
		this._newFields = newFields;
	}

	get fields(){
		return this._fields;
	}

	set fields(fields){
		this._fields = fields;
	}
}

if(!window.Me){window.Me = {};}
Me.skin = new SkinManager();

document.addEventListener('DOMContentLoaded', (event) => {
	Me.skin.initFields();
});