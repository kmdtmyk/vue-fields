import {storiesOf} from '@storybook/vue'
import {withKnobs, number, boolean, select} from '@storybook/addon-knobs'

import RangeField from '../components/RangeField'

storiesOf('RangeField', module)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = number('value', 10)
    const min = number('min', 0)
    const max = number('max', 100)
    const disabled = boolean('disabled', false)
    return {
      components: {RangeField},
      template: `
        <div>
          <range-field v-model='value' :min='${min}' :max='${max}' :disabled='${disabled}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  }, {info: true})
  .add('style', () => {
    const value = number('value', 10)
    const width = number('width', 200)
    return {
      components: {RangeField},
      template: `
        <div>
          <range-field v-model='value' style='width: ${width}px;'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  }, {info: true})
  .add('tooltip', () => {
    const value = number('value', 0)
    const min = number('min', -50)
    const max = number('max', 100)
    const tooltip = boolean('tooltip', true)
    return {
      components: {RangeField},
      template: `
        <div>
          <range-field v-model='value' :min='${min}' :max='${max}' :tooltip='${tooltip}'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  }, {info: true})
  .add('custom tooltip', () => {
    const value = number('value', 10)
    return {
      components: {RangeField},
      template: `
        <div>
          <range-field v-model='value' :tooltip='tooltip'/>
          {{value}}
        </div>
      `,
      data(){
        return {
          value,
          tooltip(value){
            return `${value}%`
          }
        }
      },
    }
  }, {info: true})
