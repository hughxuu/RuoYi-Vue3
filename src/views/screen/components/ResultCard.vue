<script setup>
import TrendValue from './TrendValue.vue'

defineProps({
  icon: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  sub: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    required: true
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
    class="min-w-0 rounded border border-screen-border-soft bg-black/10 px-1 py-2 text-center"
  >
    <div
      :class="{
        'text-screen-cyan': tone === 'cyan',
        'text-screen-orange': tone === 'orange',
        'text-screen-yellow': tone === 'yellow',
      }"
      class="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[radial-gradient(circle,_#174b69,_#103246)] text-2xl shadow-[0_0_1rem_rgba(31,172,235,0.18)]"
    >
      <component :is="icon" class="h-6 w-6" />
    </div>
    <div class="mt-2 text-xs text-slate-300">
      {{ label }}
      <small v-if="sub" class="block text-xs">{{ sub }}</small>
    </div>
    <strong class="block text-2xl leading-9 text-white">{{ value }}</strong>
    <div class="whitespace-nowrap text-xs text-screen-muted">
      较昨日
      <TrendValue
        :value="rate"
        :up="up"
        show-direction
        :class="up ? 'font-bold text-screen-red' : 'font-bold text-screen-lime'"
      />
    </div>
  </article>
</template>
