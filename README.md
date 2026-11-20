[![Publish to npm](https://github.com/kmdtmyk/vue-fields/actions/workflows/publish.yml/badge.svg)](https://github.com/kmdtmyk/vue-fields/actions/workflows/publish.yml)
[![Test](https://github.com/kmdtmyk/vue-fields/actions/workflows/test.yml/badge.svg)](https://github.com/kmdtmyk/vue-fields/actions/workflows/test.yml)
[![Deploy Playground](https://github.com/kmdtmyk/vue-fields/actions/workflows/deploy-playground.yml/badge.svg)](https://github.com/kmdtmyk/vue-fields/actions/workflows/deploy-playground.yml)

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

## npm

```bash
npm version [major | minor | patch]
git push origin main --follow-tags
```

## License

MIT
