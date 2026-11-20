export const storyRegistry = []

export const storiesOf = (name) => {
  const group = {name, stories: []}
  storyRegistry.push(group)

  return {
    addDecorator(){
      return this
    },
    add(storyName, factory){
      const definition = typeof factory === 'function' ? factory() : factory
      group.stories.push({
        id: `${name}:${storyName}`,
        name,
        story: storyName,
        definition,
        source: definition && definition.template ? definition.template.trim() : '',
      })
      return this
    },
  }
}

export const withKnobs = value => value
export const text = (name, value) => value
export const number = (name, value) => value
export const boolean = (name, value) => value
export const color = (name, value) => value
export const select = (name, values, value) => value == null ? values[0] : value
