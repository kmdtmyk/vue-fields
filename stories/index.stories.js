
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
// import {action} from '@storybook/addon-actions'
// import {linkTo} from '@storybook/addon-links'

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

import PercentageField from '../src/components/PercentageField'

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

import DateField from '../src/components/DateField'

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

