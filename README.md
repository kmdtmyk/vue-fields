[![Build Status](https://travis-ci.org/kmdtmyk/vue-fields.svg?branch=master)](https://travis-ci.org/kmdtmyk/vue-fields)

## Demo

https://kmdtmyk.github.io/vue-fields/

## Installation

```
npm install @kmdtmyk/vue-fields
```

Register as plugin.

```javascript
import VueFields from '@kmdtmyk/vue-fields'

Vue.use(VueFields)
```

Register as component.

```javascript
import {NumberField} from '@kmdtmyk/vue-fields'

Vue.component('number-field', NumberField)
```

### Plugin option

inputClass

```javascript
Vue.use(VueFields, {inputClass: 'form-control'})
```

```html
<text-field/> <!-- <input type='text' class='form-control'> -->
```
prefix, suffix

```javascript
Vue.use(VueFields, {prefix: 'v', suffix: ''})
```

```html
<v-text/> <!-- <input type='text'> -->
```

|name|default value|
|-|-|
|inputClass|''|
|prefix|''|
|suffix|'Field'|

## License

MIT
