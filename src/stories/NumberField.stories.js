import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, number, boolean, color} from '@storybook/addon-knobs'

import NumberField from '../components/NumberField'

storiesOf('NumberField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = number('value', 12345.67)
    const size = number('size', 10)
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: {NumberField},
      template: `
        <div>
          <number-field v-model='value' :size='${size}' :disabled='${disabled}' :readonly='${readonly}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
  .add('delimiter', () => {
    const value = number('value', 12345.67)
    const delimiter = boolean('delimiter', true)
    return {
      components: {NumberField},
      template: `
        <div>
          <number-field v-model='value' :delimiter='${delimiter}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
  .add('style', () => {
    const value = number('value', 123456789)
    const size = number('size', 24)
    const colour = color('color', 'red')
    return {
      components: {NumberField},
      template: `
        <div>
          <number-field v-model='value' style='font-size: ${size}px; color: ${colour};'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })

