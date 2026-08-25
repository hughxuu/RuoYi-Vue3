<script setup>
import TrendValue from './TrendValue.vue'

defineProps({
  icon: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: '较昨日'
  },
  rate: {
    type: String,
    required: true
  },
  up: {
    type: Boolean,
    default: true
  },
  tone: {
    type: String,
    default: 'cyan'
  }
})
</script>

<template>
  <article
    class="grid min-h-0 min-w-0 grid-cols-[auto_1fr] items-center gap-2 rounded border border-screen-border-soft bg-screen-kpi px-2 py-1 shadow-[inset_0_0_1rem_rgba(39,137,211,0.08)]"
  >
    <div
      :class="{
        'text-screen-cyan': tone === 'cyan',
        'text-violet-300': tone === 'violet',
        'text-screen-green': tone === 'green',
      }"
      class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle,_#174b69,_#103246)] text-xl shadow-[0_0_1rem_rgba(31,172,235,0.18)]"
    >
      <component :is="icon" class="h-6 w-6" :stroke-width="2.5" />
    </div>
    <div class="min-w-0">
      <div class="text-xs leading-4 text-slate-300">
        {{ title }}
      </div>
      <strong class="block text-2xl leading-7 tracking-wider text-white">{{ value }}</strong>
      <div class="flex items-center gap-1 whitespace-nowrap text-xs leading-4 text-screen-muted">
        {{ note }}
        <TrendValue
          :value="rate"
          :up="up"
          show-direction
          :class="up ? 'font-bold text-screen-red' : 'font-bold text-screen-lime'"
        />
      </div>
    </div>
  </article>
</template>
