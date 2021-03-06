import {storiesOf} from '@storybook/vue'
import {withKnobs, text, number, boolean, color} from '@storybook/addon-knobs'

import SelectField from '../components/SelectField'

const story = storiesOf('SelectField', module)
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
          records(query){
            const records = ['foo', 'bar', 'baz', 'hoge', 'piyo']
            if(query == null || query === ''){
              return records
            }
            return records.filter(record => {
              return record.toLowerCase().startsWith(query.toLowerCase())
            })
          }
        }
      },
    }
  }, {info: true})
  .add('async function', () => {
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' :async-wait='asyncWait'/>
          {{value}}
        </div>
      `,
      data(){
        return {
          value: '',
          records: async (query) => {
            if(!query){
              return []
            }
            const result = await fetch(`https://api.github.com/search/repositories?q=${query}`)
            const text = await result.text()
            const json = JSON.parse(text)
            return json.items.map(item => item.full_name)
          },
          asyncWait(query){
            if(!query){
              return 0
            }else{
              return 500
            }
          }
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
          records: [
            {id: 1, name: 'foo'},
            {id: 2, name: 'bar'},
            {id: 3, name: 'hoge'},
          ],
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
          <select-field v-model='value' :record.sync='record' :records='records' record-key='id'>
            <template v-slot='{record}'>
              <span>{{record.id}}. {{record.name}}</span>
            </template>
          </select-field>
          {{value}} {{record}}
        </div>
      `,
      data(){
        return {
          value,
          record: null,
          records: [
            {id: 1, name: 'foo'},
            {id: 2, name: 'bar'},
            {id: 3, name: 'hoge'},
          ],
        }
      },
    }
  }, {info: true})
  .add('empty message', () => {
    const value = text('value', '')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records'>
            <template #empty><i>Not found...</i></template>
          </select-field>
          {{value}}
        </div>
      `,
      data(){
        return {
          value,
          records: ['foo', 'bar', 'baz', 'hoge', 'piyo'],
        }
      },
    }
  }, {info: true})
  .add('dropdown style', () => {
    const value = text('value', '')
    return {
      components: {SelectField},
      template: `
        <div>
          <select-field v-model='value' :records='records' dropdown-style='border: 1px solid red;' />
          {{value}}
        </div>
      `,
      data(){
        return {
          value,
          records: ['foo', 'bar', 'baz', 'hoge', 'piyo'],
        }
      },
    }
  }, {info: true})

if(process.env.NODE_ENV === 'development'){

  story
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

}
