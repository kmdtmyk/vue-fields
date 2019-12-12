import {storiesOf} from '@storybook/vue'
import {withKnobs, text, number, boolean, color} from '@storybook/addon-knobs'
import _ from 'lodash'

import SelectField from '../components/SelectField'

storiesOf('SelectField', module)
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
          records: ['foo', 'bar', 'baz', 'hoge', 'piyo']
        }
      },
    }
  }, {info: true})
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
          records: ['foo', 'bar', 'baz', 'hoge', 'piyo']
        }
      },
    }
  }, {info: true})
  .add('custom filter', () => {
    const value = text('value', '')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' :filter='filter'/>
          {{value}}
        </div>
      `,
      data(){
        return {
          value,
          records: ['foo', 'bar', 'baz', 'hoge', 'piyo']
        }
      },
      methods: {
        filter(records, query){
          if(!query){
            return records
          }
          return records.filter(record => {
            return record.toLowerCase().startsWith(query.toLowerCase())
          })
        },
      },
    }
  }, {info: true})
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
  }, {info: true})
  .add('object array', () => {
    const value = number('value', '')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records'>
            <template v-slot='{record}'>
              <span>{{record.id}}. {{record.name}}</span>
            </template>
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
  }, {info: true})
  .add('object array (record-key)', () => {
    const value = number('value', '')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' record-key='id'>
            <template v-slot='{record}'>
              <span>{{record.id}}. {{record.name}}</span>
            </template>
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
  }, {info: true})
  .add('async function', () => {
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' :loading='loading' @input.native='input'/>
          {{value}}
        </div>
      `,
      data(){
        return {
          value: '',
          records: [],
          loading: false,
        }
      },
      methods: {
        input(e){
          this.loading = true
          this.search(e.target.value)
        },
        search: _.debounce(async function(query){
          const result = await fetch(`https://api.github.com/search/repositories?q=${query}`)
          const text = await result.text()
          const json = JSON.parse(text)
          this.records = () => json.items.map(item => item.name)
          this.loading = false
        }, 500),
      },
    }
  }, {info: true})
  .add('performance test', () => {
    const value = number('value', '')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' record-key='id' v-for='i in 100' :key='i'>
            <template v-slot='{record}'>
              <span>{{record.id}}. {{record.name}}</span>
            </template>
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
  }, {info: true})
