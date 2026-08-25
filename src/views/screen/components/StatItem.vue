<script setup>
import TrendValue from './TrendValue.vue'

defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  tone: {
    type: String,
    default: 'blue'
  }
})
</script>

<template>
  <div class="grid gap-1 text-center">
    <span class="text-xs text-slate-400">{{ label }}</span>
    <TrendValue
      :class="{
        'text-screen-blue': tone === 'blue',
        'text-screen-red': tone === 'red',
        'text-screen-green': tone === 'green',
      }"
      class="font-bold text-sm"
      :value="value"
    />
  </div>
</template>
