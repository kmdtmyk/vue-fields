
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import DateField from '../components/DateField'

storiesOf('DateField', module).addDecorator(VueInfoAddon).add('basic', () => ({
  components: { DateField },
  template: `
    <div>
      <date-field v-model='value'/>{{value}}
    </div>
  `,
  data(){
    return {value: '2018-12-15'}
  },
}))

