
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import PercentageField from '../components/PercentageField'

storiesOf('PercentageField', module).addDecorator(VueInfoAddon).add('basic', () => ({
  components: { PercentageField },
  template: `
    <div>
      <percentage-field v-model='value'/>{{value}}
    </div>
  `,
  data(){
    return {value: '0.5'}
  },
}))
