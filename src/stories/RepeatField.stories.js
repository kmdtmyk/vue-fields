import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, number} from '@storybook/addon-knobs'

import RepeatField from '../components/RepeatField'
import SelectField from '../components/SelectField'

storiesOf('RepeatField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => ({
    components: {RepeatField},
    template: `
      <div>
        <repeat-field v-model='values'>
          <input type='text' slot-scope='{index}' v-model='values[index]'>
        </repeat-field>
        <pre>{{values}}</pre>
      </div>
    `,
    data(){
      return {values: []}
    },
  }))
  .add('max', () => {
    const max = number('max', 3)
    return {
      components: {RepeatField},
      template: `
        <div>
          <repeat-field v-model='values' :max='${max}'>
            <input type='text' slot-scope='{index}' v-model='values[index]'>
          </repeat-field>
          <pre>{{values}}</pre>
        </div>
      `,
      data(){
        return {values: []}
      },
    }
  })
  .add('object array', () => ({
    components: {RepeatField},
    template: `
      <div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>price</th>
              <th>release date</th>
              <th></th>
            </tr>
          </thead>
          <repeat-field v-model='books' tag='tbody' record-name='book'>
            <tr slot-scope='{book, remove, present}'>
              <td><input type='text' v-model='book.name'></td>
              <td><input type='number' v-model='book.price'></td>
              <td><input type='date' v-model='book.releaseDate'></td>
              <td><button type='button' v-if='present' @click='remove'>remove</button></td>
            </tr>
          </repeat-field>
        </table>
        <pre>{{books}}</pre>
      </div>
    `,
    data(){
      return {
        books: []
      }
    },
  }))
  .add('object array (nest)', () => ({
    components: {RepeatField},
    template: `
      <div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>comments</th>
              <th></th>
            </tr>
          </thead>
          <repeat-field v-model='books' tag='tbody' record-name='book'>
            <tr slot-scope='{book, remove, present}'>
              <td><input type='text' v-model='book.name'></td>
              <td>
                <repeat-field v-model='book.comments' record-name='comment'>
                  <input type='text' slot-scope='{comment}' v-model='comment.body'>
                </repeat-field>
              </td>
              <td><button type='button' v-if='present' @click='remove'>remove</button></td>
            </tr>
          </repeat-field>
        </table>
        <pre>{{books}}</pre>
      </div>
    `,
    data(){
      return {
        books: []
      }
    },
  }))
  .add('with select field', () => ({
    components: {RepeatField, SelectField},
    template: `
      <div>
        <repeat-field v-model='values'>
          <select-field slot-scope='{index}' v-model='values[index]' :records='records'/>
        </repeat-field>
        <pre>{{values}}</pre>
      </div>
    `,
    data(){
      return {
        values: [],
        records: ['foo', 'bar', 'baz', 'hoge', 'piyo'],
      }
    },
  }))
