
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, text, number, boolean} from '@storybook/addon-knobs'

import IntegerField from '../components/IntegerField'

storiesOf('IntegerField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = number('value', 123456789)
    const size = number('size', 10)
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: {IntegerField},
      template: `
        <div>
          <integer-field v-model='value' :size='${size}' :disabled='${disabled}' :readonly='${readonly}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
