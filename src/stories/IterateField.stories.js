
import {storiesOf} from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import IterateField from '../components/IterateField'

storiesOf('IterateField', module).addDecorator(VueInfoAddon).add('basic', () => ({
  components: { IterateField },
  template: `
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>release date</th>
            <th><button type='button' @click='books.push({})'>add</button></th>
          </tr>
        </thead>
        <iterate-field v-model='books' wrapper-tag='tbody' record-name='book'>
          <tr slot-scope='{book, remove}'>
            <td><input type='text' v-model='book.name'></td>
            <td><input type='number' v-model='book.price'></td>
            <td><input type='date' v-model='book.releaseDate'></td>
            <td><button type='button' @click='remove'>remove</button></td>
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

