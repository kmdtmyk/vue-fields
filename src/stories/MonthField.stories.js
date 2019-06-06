import {storiesOf} from '@storybook/vue'
import {withKnobs, text, number, boolean, color} from '@storybook/addon-knobs'

import MonthField from '../components/MonthField'

storiesOf('MonthField', module)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = text('value', '2018-12')
    const size = number('size', 10)
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: {MonthField},
      template: `
        <div>
          <month-field v-model='value' :size='${size}' :disabled='${disabled}' :readonly='${readonly}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  }, {info: true})
  .add('style', () => {
    const value = text('value', '2018-12')
    const size = number('size', 24)
    const colour = color('color', 'red')
    return {
      components: {MonthField},
      template: `
        <div>
          <month-field v-model='value' style='font-size: ${size}px; color: ${colour};'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  }, {info: true})

