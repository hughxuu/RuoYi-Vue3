<script setup>
import { ArrowDown, ArrowUp } from '@lucide/vue'
import { computed } from 'vue'
import AnimatedStatistic from './AnimatedStatistic.vue'

const props = defineProps({
  value: {
    type: [String, Number],
    default: '-'
  },
  up: {
    type: Boolean,
    default: true
  },
  showDirection: {
    type: Boolean,
    default: false
  }
})

const rawValue = computed(() => typeof props.value === 'number' ? props.value.toString() : props.value)
const hasDirection = computed(() => /^[↑↓]/.test(rawValue.value))
const shouldShowDirection = computed(() => hasDirection.value || (props.showDirection && rawValue.value !== '-'))
const isUp = computed(() => rawValue.value.startsWith('↓') ? false : rawValue.value.startsWith('↑') ? true : props.up)
const displayValue = computed(() => rawValue.value.replace(/^[↑↓]\s*/, ''))
</script>

<template>
  <div class="inline-flex items-center gap-1 whitespace-nowrap">
    <component
      :is="isUp ? ArrowUp : ArrowDown"
      v-if="shouldShowDirection"
      :size="18"
      :stroke-width="3"
    />
    <AnimatedStatistic :value="displayValue" />
  </div>
</template>
