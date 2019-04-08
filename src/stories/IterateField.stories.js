import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import {withKnobs, number} from '@storybook/addon-knobs'

import IterateField from '../components/IterateField'
import SelectField from '../components/SelectField'

storiesOf('IterateField', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('basic', () => ({
    components: {IterateField},
    template: `
      <div>
        <iterate-field v-model='values'>
          <input type='text' slot-scope='{index}' v-model='values[index]'>
        </iterate-field>
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
      components: {IterateField},
      template: `
        <div>
          <iterate-field v-model='values' :max='${max}'>
            <input type='text' slot-scope='{index}' v-model='values[index]'>
          </iterate-field>
          <pre>{{values}}</pre>
        </div>
      `,
      data(){
        return {values: []}
      },
    }
  })
  .add('object array', () => ({
    components: {IterateField},
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
          <iterate-field v-model='books' tag='tbody' record-name='book'>
            <tr slot-scope='{book, remove, present}'>
              <td><input type='text' v-model='book.name'></td>
              <td><input type='number' v-model='book.price'></td>
              <td><input type='date' v-model='book.releaseDate'></td>
              <td><button type='button' v-if='present' @click='remove'>remove</button></td>
            </tr>
          </iterate-field>
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
    components: {IterateField},
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
          <iterate-field v-model='books' tag='tbody' record-name='book'>
            <tr slot-scope='{book, remove, present}'>
              <td><input type='text' v-model='book.name'></td>
              <td>
                <iterate-field v-model='book.comments' record-name='comment'>
                  <input type='text' slot-scope='{comment}' v-model='comment.body'>
                </iterate-field>
              </td>
              <td><button type='button' v-if='present' @click='remove'>remove</button></td>
            </tr>
          </iterate-field>
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
    components: {IterateField, SelectField},
    template: `
      <div>
        <iterate-field v-model='values'>
          <select-field slot-scope='{index}' v-model='values[index]' :records='records'/>
        </iterate-field>
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
