
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import IntegerField from '../src/components/IntegerField'

storiesOf('IntegerField', module).addDecorator(VueInfoAddon).add('basic', () => ({
  components: { IntegerField },
  template: `
    <div>
      <integer-field v-model='value'/>{{value}}
    </div>
  `,
  data(){
    return {value: 123456789}
  },
}))
