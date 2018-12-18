
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, text, number, boolean, color} from '@storybook/addon-knobs'

import TextField from '../components/TextField'

storiesOf('TextField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const value = text('value', 'foo')
    const size = number('size', 10)
    const readonly = boolean('readonly', false)
    const disabled = boolean('disabled', false)
    return {
      components: {TextField},
      template: `
        <div>
          <text-field v-model='value' :size='${size}' :disabled='${disabled}' :readonly='${readonly}'/>
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
  .add('style', () => {
    const value = text('value', 'foo')
    const size = number('size', 24)
    const colour = color('color', 'red')
    return {
      components: {TextField},
      template: `
        <div>
          <text-field v-model='value' style='font-size: ${size}px; color: ${colour};'/>
          {{value}}
        </div>
      `,
      data(){
        return {value}
      },
    }
  })
  .add('multiple', () => ({
    components: {TextField},
    template: `
      <div>
        <text-field v-model='value' multiple/>
        {{value}}
      </div>
    `,
    data(){
      return {
        value: []
      }
    },
  }))
  .add('autocomplete (array)', () => ({
    components: {TextField},
    template: `
      <div>
        <text-field v-model='value' :autocomplete='["foo", "bar", "hoge"]'/>
        {{value}}
      </div>
    `,
    data(){
      return {
        value: '',
      }
    },
  }))
  .add('autocomplete (ajax)', () => ({
    components: {TextField},
    template: `
      <div>
        <text-field v-model='value' :autocomplete='autocomplete'/>
        {{value}}
      </div>
    `,
    data(){
      return {
        value: '',
        autocomplete: [],
      }
    },
    watch: {
      async value(){
        const query = this.value
        if(!query){
          this.autocomplete = []
          return
        }
        const result = await fetch(`https://api.github.com/search/repositories?q=${query}`)
        const text = await result.text()
        const json = JSON.parse(text)
        this.autocomplete = () => json.items.map(item => item.name)
      }
    },
  }))

