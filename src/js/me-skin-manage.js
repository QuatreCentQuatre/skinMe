class SkinManager {
	constructor(options){
		this.name     	= "SkinManager";
		this.fields   	= [];
		this.options 	= options;
		this.newFields 	= [];
	}

	initFields($root = jQuery('html')){
		this.clearFields();

		let fields = $root.find('[me\\:skin]');
		this.newFields = [];

		for (let i = 0; i < fields.length; i++) {
			this.addField(jQuery(fields[i]));
		}

		// /* Initialize all new fields*/
		for (let j = 0; j < this._newFields.length; j++) {
			this.newFields[j].initialize();
		}
	}

	getField($field){
		for (let i in this.fields) {
            let field = this.fields[i];

            if(field.ID === $field.attr('id')){
               return field;
            }
        }
	}

	addField($field, shouldInit = false){
		let fieldType = $field.attr('me:skin');
		let fieldParams = {field: $field[0], type: fieldType};
		let className = `Skin${fieldType.charAt(0).toUpperCase()}${fieldType.slice(1)}`;

		/* Look if the field is valid */
		if (typeof Me.skinTypes[className] !== "function") {
			console.error(`The skin type ${className} does not exist. Please select one listed in the following array`, Object.keys(Me.skinTypes));
			return;
		}

		/* Look if the field has already been rendered */
		if ($field.attr('me:skin:render')) {return;}

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

			if(typeof field.$el == "object"){
				let selector = jQuery('html').find(field.$el[0]);

				if (selector.length > 0) {
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

Me.skin = new SkinManager();

jQuery(document).ready(function() {
	Me.skin.initFields();
});