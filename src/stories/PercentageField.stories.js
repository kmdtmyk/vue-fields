
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, text, number, boolean} from '@storybook/addon-knobs'

import PercentageField from '../components/PercentageField'

storiesOf('PercentageField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = text('value', '0.5')
    const size = number('size', 10)
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: { PercentageField },
      template: `
        <div>
          <percentage-field v-model='value' :size='${size}' :disabled='${disabled}' :readonly='${readonly}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
