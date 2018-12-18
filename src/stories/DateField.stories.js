import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, text, number, boolean, color} from '@storybook/addon-knobs'

import DateField from '../components/DateField'

storiesOf('DateField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = text('value', '2018-12-15')
    const size = number('size', 10)
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: {DateField},
      template: `
        <div>
          <date-field v-model='value' :size='${size}' :disabled='${disabled}' :readonly='${readonly}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
  .add('style', () => {
    const value = text('value', '2018-12-15')
    const size = number('size', 24)
    const colour = color('color', 'red')
    return {
      components: {DateField},
      template: `
        <div>
          <date-field v-model='value' style='font-size: ${size}px; color: ${colour};'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })

