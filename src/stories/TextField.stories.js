
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, text, boolean} from '@storybook/addon-knobs'

import TextField from '../components/TextField'

storiesOf('TextField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = text('value', 'foo')
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: {TextField},
      template: `
        <div>
          <text-field v-model='value' :disabled='${disabled}' :readonly='${readonly}'/>
          {{value}}
        </div>
      `,
      data(){
        return {
          value,
        }
      },
    }
  })
  .add('multiple', () => ({
    components: {TextField},
    template: `
      <div>
        <text-field v-model='value' multiple/>{{value}}
      </div>
    `,
    data(){
      return {
        value: []
      }
    },
  }))
  .add('autocomplete', () => ({
    components: {TextField},
    template: `
      <div>
        <text-field v-model='value' :autocomplete='["foo", "bar", "hoge"]'/>{{value}}
      </div>
    `,
    data(){
      return {
        value: '',
      }
    },
  }))

