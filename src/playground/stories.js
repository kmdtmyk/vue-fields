import {storyRegistry} from './story'

// Import every original story file. Each file registers itself through the
// Storybook-compatible local adapter in ./story.js.
import.meta.glob('../stories/*.stories.js', {eager: true})

// Keep the source shown in the Playground tied to the original story file.
// The executable story definition and the source displayed to users are
// intentionally separate: evaluating a story should not rewrite its source.
const storySources = import.meta.glob('../stories/*.stories.js', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const sourceByName = Object.values(storySources).reduce((sources, source) => {
  const match = source.match(/storiesOf\(\s*['"]([^'"]+)['"]/) 
  if(match) sources[match[1]] = source
  return sources
}, {})

const sourceForStory = (source, storyName) => {
  if(!source) return ''

  const stories = [...source.matchAll(/\.add\(\s*(['"])(.*?)\1/g)]
  const index = stories.findIndex(match => match[2] === storyName)
  if(index === -1) return source

  const start = stories[index].index
  const end = stories[index + 1] ? stories[index + 1].index : source.length
  return source.slice(start, end).trim()
}

export const examples = storyRegistry.flatMap(group => group.stories).map(example => ({
  ...example,
  component: example.definition,
  tag: example.name.replace('Field', '-field').toLowerCase(),
  description: `${example.name} - ${example.story}`,
  source: sourceForStory(sourceByName[example.name], example.story) || example.source,
  props: {},
  value: '',
}))

export default examples
