
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import IterateField from '../components/IterateField'

storiesOf('IterateField', module)
  .addDecorator(VueInfoAddon)
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
          <iterate-field v-model='books' wrapper-tag='tbody' record-name='book'>
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
      return {books: []}
    },
  }))
