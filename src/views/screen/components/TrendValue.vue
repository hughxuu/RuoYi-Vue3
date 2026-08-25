<script setup>
import { ArrowDown, ArrowUp } from '@lucide/vue'
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
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

const hasDirection = computed(() => /^[↑↓]/.test(props.value))
const isUp = computed(() =>
  props.value.startsWith('↓') ? false : props.value.startsWith('↑') ? true : props.up
)
const displayValue = computed(() => props.value.replace(/^[↑↓]\s*/, ''))
</script>

<template>
  <span class="inline-flex items-center gap-1 whitespace-nowrap">
    <component
      :is="isUp ? ArrowUp : ArrowDown"
      v-if="hasDirection || showDirection"
      :size="18"
      :stroke-width="3"
    />
    <span>{{ displayValue }}</span>
  </span>
</template>
