<template>
  <div class="playground">
    <aside class="sidebar">
      <h1>Vue Fields</h1>
      <p class="subtitle">Vue 2 component playground</p>
      <nav>
        <section v-for="group in groupedExamples" :key="group.name" class="story-group">
          <h2>{{ group.name }}</h2>
          <button v-for="example in group.examples" :key="example.id" class="nav-item" :class="{active: example.id === selected}" type="button" @click="selected = example.id">
            {{ example.story }}
          </button>
        </section>
      </nav>
    </aside>

    <main class="content">
      <header class="page-header">
        <div>
          <p class="eyebrow">Component</p>
          <h2>{{ currentExample.name }} / {{ currentExample.story }}</h2>
          <p>{{ currentExample.description }}</p>
        </div>
        <code>&lt;{{ currentExample.tag }} /&gt;</code>
      </header>

      <section class="workspace">
        <div class="preview-card">
          <h3>Preview</h3>
          <div ref="previewStage" class="preview-stage">
            <component :is="currentExample.component" v-model="values[selected]" v-bind="currentExample.props" />
          </div>
        </div>

        <div class="controls-card">
          <h3>Controls</h3>
          <label class="control-row">
            <span>value</span>
            <input v-model="values[selected]" type="text">
          </label>
          <label class="control-row checkbox-row">
            <span>disabled</span>
            <input v-model="disabled" type="checkbox">
          </label>
          <label class="control-row checkbox-row">
            <span>readonly</span>
            <input v-model="readonly" type="checkbox">
          </label>
        </div>
      </section>

      <section class="source-card">
        <h3>Story source</h3>
        <pre><code>{{ currentExample.source }}</code></pre>
      </section>
    </main>
  </div>
</template>

<script>
import examples from './playground/stories'

export default {
  data(){
    return {
      selected: examples[0].id,
      disabled: false,
      readonly: false,
      values: examples.reduce((values, example) => {
        values[example.id] = example.value
        return values
      }, {}),
      examples,
    }
  },
  mounted(){
    this.syncPreviewControls()
  },
  computed: {
    groupedExamples(){
      return this.examples.reduce((groups, example) => {
        let group = groups.find(item => item.name === example.name)
        if(!group){
          group = {name: example.name, tag: example.tag, examples: []}
          groups.push(group)
        }
        group.examples.push(example)
        return groups
      }, [])
    },
    currentExample(){
      const example = this.examples.find(item => item.id === this.selected)
      return {
        ...example,
        props: {
          disabled: this.disabled,
          readonly: this.readonly,
          ...(example.props || {}),
        },
      }
    },
  },
  watch: {
    selected(){
      this.$nextTick(this.syncPreviewControls)
    },
    disabled(){
      this.$nextTick(this.syncPreviewControls)
    },
    readonly(){
      this.$nextTick(this.syncPreviewControls)
    },
    values: {
      deep: true,
      handler(){
        this.$nextTick(this.syncPreviewControls)
      },
    },
  },
  methods: {
    syncPreviewControls(){
      const stage = this.$refs.previewStage
      if(!stage) return

      const inputs = stage.querySelectorAll('input, textarea, select')
      inputs.forEach(input => {
        input.disabled = this.disabled
        if('readOnly' in input) input.readOnly = this.readonly

        const value = this.values[this.selected]
        if(document.activeElement !== input && value != null && input.value !== String(value)){
          input.value = value
          input.dispatchEvent(new Event('input', {bubbles: true}))
        }
      })
    },
  },
}
</script>

<style>
:root { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #1f2937; background: #f4f6f8; }
* { box-sizing: border-box; }
body { margin: 0; }
button, input { font: inherit; }
.playground { min-height: 100vh; display: flex; }
.sidebar { position: sticky; top: 0; width: 240px; height: 100vh; flex: 0 0 240px; overflow-y: auto; padding: 28px 16px; background: #172033; color: #fff; }
.sidebar h1 { margin: 0; font-size: 22px; }
.subtitle { margin: 6px 0 28px; color: #aeb9cc; font-size: 13px; }
.story-group { margin-bottom: 14px; padding: 8px; border: 1px solid #2e405f; border-radius: 8px; background: #1d2a40; }
.story-group h2 { margin: 0 0 5px; padding: 2px 5px 7px; border-bottom: 1px solid #344968; color: #fff; font-size: 14px; letter-spacing: .02em; }
.nav-item { display: block; width: 100%; padding: 3px 12px; border: 0; border-radius: 6px; color: #c6d0df; background: transparent; text-align: left; cursor: pointer; }
.nav-item:hover, .nav-item.active { color: #fff; background: #2e405f; }
.content { width: min(1100px, 100%); padding: 44px; margin: 0 auto; }
.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
.page-header h2 { margin: 4px 0 8px; font-size: 32px; }
.page-header p { margin: 0; color: #667085; }
.eyebrow { color: #526dff !important; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.page-header code { padding: 8px 12px; border-radius: 6px; background: #e7ebf2; color: #48546a; }
.workspace { display: grid; grid-template-columns: 1fr 300px; gap: 20px; }
.preview-card, .controls-card { padding: 24px; border: 1px solid #e0e5ec; border-radius: 10px; background: #fff; box-shadow: 0 2px 8px rgb(31 41 55 / 4%); }
.preview-card h3, .controls-card h3 { margin: 0 0 20px; font-size: 15px; }
.preview-stage { all: revert; }
.control-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; color: #667085; font-size: 13px; }
.control-row input[type=text] { width: 170px; padding: 7px 8px; border: 1px solid #c5ccd7; border-radius: 5px; }
.checkbox-row { justify-content: flex-start; }
.checkbox-row input { margin: 0; }
.source-card { margin-top: 20px; padding: 24px; border: 1px solid #e0e5ec; border-radius: 10px; background: #fff; }
.source-card h3 { margin: 0 0 20px; font-size: 15px; }
.source-card pre { margin: 0; padding: 16px; overflow: auto; border-radius: 6px; background: #172033; color: #d6e1f2; font-size: 12px; line-height: 1.5; }
@media (max-width: 760px) {
  .playground { display: block; }
  .sidebar { position: static; width: auto; height: auto; padding: 18px; }
  .sidebar nav { display: flex; gap: 6px; overflow-x: auto; }
  .nav-item { min-width: max-content; }
  .content { padding: 24px 16px; }
  .workspace { grid-template-columns: 1fr; }
}
</style>
