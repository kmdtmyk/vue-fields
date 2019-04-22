import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, number, boolean, color} from '@storybook/addon-knobs'

import YearField from '../components/YearField'

storiesOf('YearField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = number('value', 2018)
    const size = number('size', 10)
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: {YearField},
      template: `
        <div>
          <year-field v-model='value' :size='${size}' :disabled='${disabled}' :readonly='${readonly}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
  .add('style', () => {
    const value = number('value', 2018)
    const size = number('size', 24)
    const colour = color('color', 'red')
    return {
      components: {YearField},
      template: `
        <div>
          <year-field v-model='value' style='font-size: ${size}px; color: ${colour};'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })

