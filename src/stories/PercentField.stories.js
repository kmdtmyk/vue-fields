import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, text, number, boolean, color} from '@storybook/addon-knobs'

import PercentField from '../components/PercentField'

storiesOf('PercentField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = text('value', '0.5')
    const size = number('size', 10)
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: {PercentField},
      template: `
        <div>
          <percent-field v-model='value' :size='${size}' :disabled='${disabled}' :readonly='${readonly}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
  .add('style', () => {
    const value = text('value', '0.5')
    const size = number('size', 24)
    const colour = color('color', 'red')
    return {
      components: {PercentField},
      template: `
        <div>
          <percent-field v-model='value' style='font-size: ${size}px; color: ${colour};'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
  .add('min and max', () => {
    const value = text('value', '0.5')
    const min = text('min', '0')
    const max = text('max', '1')
    return {
      components: {PercentField},
      template: `
        <div>
          <percent-field v-model='value' :min='${min}' :max='${max}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
  .add('custom', () => {
    const value = text('value', '0.5')
    return {
      components: {PercentField},
      template: `
        <div>
          <percent-field v-model='value' :unit='1/1000' suffix='‰'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
