
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import TextField from '../src/components/TextField'

storiesOf('TextField', module).addDecorator(VueInfoAddon)
  .add('basic', () => ({
    components: { TextField },
    template: `
      <div>
        <text-field v-model='value'/>{{value}}
      </div>
    `,
    data(){
      return {value: ''}
    },
  }))
  .add('multiple', () => ({
    components: { TextField },
    template: `
      <div>
        <text-field v-model='value' multiple/>{{value}}
      </div>
    `,
    data(){
      return {value: []}
    },
  }))

