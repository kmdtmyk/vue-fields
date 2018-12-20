import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, text, number, boolean, color} from '@storybook/addon-knobs'

import SelectField from '../components/SelectField'

storiesOf('SelectField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = text('value', '')
    const size = number('size', 10)
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' :size='${size}' :disabled='${disabled}' :readonly='${readonly}'/>
          {{value}}
        </div>
      `,
      data(){
        return {
          value,
          records: ['foo', 'bar', 'hoge']
        }
      },
    }
  })
  .add('style', () => {
    const value = text('value', '')
    const size = number('size', 24)
    const colour = color('color', 'red')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' style='font-size: ${size}px; color: ${colour};'/>
          {{value}}
        </div>
      `,
      data(){
        return {
          value,
          records: ['foo', 'bar', 'hoge']
        }
      },
    }
  })
  .add('function', () => {
    const value = text('value', '')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records'/>
          {{value}}
        </div>
      `,
      data(){
        return {
          value,
          records: (query) => {
            if(!query){
              return []
            }
            return query.split('').map((value, index) => value.repeat(index + 1))
          },
        }
      },
    }
  })
  .add('object array', () => {
    const value = number('value', '')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' record-key='id'>
            <span slot-scope='{record}'>{{record.id}}. {{record.name}}</span>
          </select-field>
          {{value}}
        </div>
      `,
      data(){
        return {
          value,
          records: (query) => {
            const records = [
              {id: 1, name: 'foo'},
              {id: 2, name: 'bar'},
              {id: 3, name: 'hoge'},
            ]
            if(!query){
              return records
            }
            return records.filter(record => record.name.startsWith(query))
          },
        }
      },
    }
  })
  .add('performance test', () => {
    const value = number('value', '')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' record-key='id' v-for='i in 100' :key='i'>
            <span slot-scope='{record}'>{{record.id}}. {{record.name}}</span>
          </select-field>
        </div>
      `,
      data(){
        return {
          value,
          records: (query) => {
            const records = [...Array(1000)].map((_, i) => ({id: ++i, name:`name${i}`}))
            if(!query){
              return records
            }
            return records.filter(record => record.name.startsWith(query))
          },
        }
      },
    }
  })
