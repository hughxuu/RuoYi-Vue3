<script setup>
import TrendValue from './TrendValue.vue'

defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    default: '-'
  },
  tone: {
    type: String,
    default: 'blue'
  }
})
</script>

<template>
  <div class="grid justify-items-center gap-1 text-center">
    <span class="text-xs text-slate-400">{{ label }}</span>
    <TrendValue
      :class="{
        'text-chart-blue': tone === 'blue',
        'text-chart-red': tone === 'red',
        'text-chart-green': tone === 'green',
      }"
      class="font-bold text-sm"
      :value="value"
    />
  </div>
</template>
