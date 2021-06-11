skinMe
========

Dependencies

- Babel Polyfill (https://babeljs.io/docs/en/babel-polyfill#usage-in-browser)
- jQuery (https://jquery.com/)

## How to implement

First, you'll need to link Babel Polyfill, jQuery and skinMe files in your project 
```html
<link href='/path/to/directory/me-skin.min.css' rel='stylesheet' type='text/css' />

<script type="text/javascript" src="/path/to/directory/polyfill.js"></script>
<script type="text/javascript" src="/path/to/directory/jquery.js"></script>

<script type="text/javascript" src="/path/to/directory/me-skin.min.js"></script>
```

Then you're already good to go and customize your first element!


### Customize elements


#### Radio & Checkbox
Create an input of type radio. Then you'll need to add the attribute <b>me:skin</b> with the wanted type (radio or checkbox)

```html
<!--Radio-->
<input me:skin="radio" type="radio" id="radio-direction-down" name="direction" value="down" />

<!--Checkbox-->
<input me:skin="checkbox" type="checkbox" id="checkbox-side-left" name="side[]" value="left"/>
```
<br>
You'll need to add custom element with some mandatory attributes. First, we need to add the <b>me:skin:id</b> attribute
with the same value as the input we want it to be link to. The value of this attribute must be the <b>ID</b> of the input.
The <b>me:skin:theme</b> attribute is non-mandatory. It's only purpose is to easily know wich theme is applied to 
this custom input and to target all element with the same theme in CSS. You can decide to set a class instead. It's up to you. 

<br>
<br>

```html
<!--Radio-->
<span me:skin:id="radio-direction-down" me:skin:theme="skinMe-radio"></span>

<!--Checkbox-->
<span me:skin:id="checkbox-side-left" me:skin:theme="skinMe-checkbox"></span>
```


#### Select
Create a select. Then you'll need to add the attribute me:skin with the "select" value.

```html
<select me:skin="select" name="select-number" id="select-number">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
</select>
```

Then you'll need to create a div with a <b>me:skin:id</b> and a <b>me:skin:theme</b> attribute. 
The me:skin:id need the ID of the select element. The me:skin:theme as a skin only purpose. 
It will be use to target in CSS and style the custom element.

You should have something similar to this:
```html
<select me:skin="select" name="select-number" id="select-number">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
</select>

<div me:skin:id="select-number" me:skin:theme="skinMe-select">
    
</div>
```

In the div you just created, you'll need to add two more things, a element to display the selected 
value and a list of choice which is the same as the select options.

```html
<!--Value will be insert in span-->
<span me:skin:selection="select-number"></span>

<!--List of choice that will appear when open-->
<div me:skin:choices="select-number">
    <div class="choice">1</div>
    <div class="choice">2</div>
    <div class="choice">3</div>
    <div class="choice">4</div>
</div>
```

The select element needs few things to be set in order to work.
* Attributes
    * me:skin:selection
    * me:skin:choices
* Wrapper element (Example: div)
<br>

<b>me:skin:selection</b>
<br>
This attribute needs to have the ID of the wanted input as value to keep a relation between both. The selected value will render in the element.
<br>

<b>me:skin:choices</b>
<br>
This attribute needs to have the ID of the wanted input as value to keep a relation between both. 
You need to put this attribute on the element wrapping all choices from your custom skin.

<b>Wrapper element</b>
<br>
This is the easiest part! Simply wrap your select and custom skin with a div or whatever element you want.

At the end you should have something similar to this:
```html
<!--This div is the wrapper-->
<label for="select-number">Label Select</label>

<div>
    <select name="select-number" id="select-number" me:skin:select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>

    <div me:skin:id="select-number" me:skin:theme="skinMe-select">
        <span me:skin:selection="select-number"></span>
        <div me:skin:choices="select-number">
            <div class="choice">1</div>
            <div class="choice">2</div>
            <div class="choice">3</div>
            <div class="choice">4</div>
        </div>
    </div>
</div>
```

Once the HTML is in place, the SkinManager class will take care of everything if the JS file are linked!

###Optionnal attibutes
<b>default</b>
<br>
This attribute needs to be set on an option tag of your select. The attribute will be reflected on the custom div choice element.

<b>selected</b>
<br>
This attribute needs to be set on an option tag of your select. This attribute will define the value as the initial one.


## Skin Manager functions

### Initialize new field
In case you need to add DOM and that DOM has a field in it, you'll need to call a function to create and 
initialize this field. This function is **addField()** and accept 2 parameters. The first one (mandatory) is the field to add, it needs to be an element.
The second one, is a boolean to trigger the initialize on creation. 

```javascript
Me.skin.addField($field, shouldInit);

// Example
Me.skin.addField($('#select-number'), true);
```
 
If you have more than one field added to the DOM, call the function **initFields()** of Me.skin.

initFields accept one parameter. This parameter define where the manager will search for new fields in the DOM.
The parameter **must** be an **element**.

```javascript
Me.skin.initFields();
// or
Me.skin.initFields($('form'));
```

### Clear deleted fields
When deleting DOM that contains one or multiple fields, you should clear them.
Simply call the **clearFields** function and the Skin Manager will take care of the rest. 
Just don't forget to remove all events if you have bind some on the deleted element.

```javascript
Me.skin.clearFields();
```

###Get a single Field
If your are looking to update a field, all you need to do is fetch de field object with Me.skin.getField($field). Then you can modify it.

```javascript
Me.skin.getField($('#select-number'));
```

## Single field setter

### disabled

Speaks for itself, it will disable your field, so no more interaction with it will be possible.

```javascript
let field = Me.skin.getField($('#select-number'));
field.disabled = true;
```