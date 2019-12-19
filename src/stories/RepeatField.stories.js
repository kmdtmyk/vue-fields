import {storiesOf} from '@storybook/vue'
import {withKnobs, number} from '@storybook/addon-knobs'

import RepeatField from '../components/RepeatField'
import SelectField from '../components/SelectField'

const story = storiesOf('RepeatField', module)
  .addDecorator(withKnobs)
  .add('basic', () => {
    return {
      components: {RepeatField},
      template: `
        <div>
          <repeat-field v-model='values'>
            <template v-slot='{index}'>
              <input type='text' v-model='values[index]'>
            </template>
          </repeat-field>
          <pre>{{values}}</pre>
        </div>
      `,
      data(){
        return {values: []}
      },
    }
  }, {info: true})
  .add('max', () => {
    const max = number('max', 3)
    return {
      components: {RepeatField},
      template: `
        <div>
          <repeat-field v-model='values' :max='${max}'>
            <template v-slot='{index}'>
              <input type='text' v-model='values[index]'>
            </template>
          </repeat-field>
          <pre>{{values}}</pre>
        </div>
      `,
      data(){
        return {values: []}
      },
    }
  }, {info: true})
  .add('object array', () => {
    return {
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
              <template v-slot='{book, remove, present}'>
                <tr>
                  <td><input type='text' v-model='book.name'></td>
                  <td><input type='number' v-model='book.price'></td>
                  <td><input type='date' v-model='book.releaseDate'></td>
                  <td><button type='button' v-if='present' @click='remove'>remove</button></td>
                </tr>
              </template>
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
    }
  }, {info: true})
  .add('object array (nest)', () => {
    return {
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
              <template v-slot='{book, remove, present}'>
                <tr>
                  <td><input type='text' v-model='book.name'></td>
                  <td>
                    <repeat-field v-model='book.comments' record-name='comment'>
                      <template v-slot='{comment}'>
                        <input type='text' v-model='comment.body'>
                      </template>
                    </repeat-field>
                  </td>
                  <td><button type='button' v-if='present' @click='remove'>remove</button></td>
                </tr>
              </template>
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
    }
  }, {info: true})

if(process.env.NODE_ENV === 'development'){

  story
    .add('with select field', () => {
      return {
        components: {RepeatField, SelectField},
        template: `
          <div>
            <repeat-field v-model='values'>
              <template v-slot='{index}'>
                <select-field v-model='values[index]' :records='records'/>
              </template>
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
      }
    }, {info: true})

}
