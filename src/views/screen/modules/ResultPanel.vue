<script setup>
import { Medal, Target, Users } from '@lucide/vue'
import ResultCard from '../components/ResultCard.vue'
import ScreenPanel from '../components/ScreenPanel.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <ScreenPanel title="战果类数据">
    <div class="grid h-full min-h-0 grid-cols-3 gap-2 p-2">
      <ResultCard :icon="Target" label="抓获网逃数" tone="cyan" v-bind="data.fugitive" />
      <ResultCard :icon="Users" label="抓获团伙数" tone="orange" v-bind="data.gang" />
      <ResultCard
        :icon="Medal"
        label="抓获现行"
        sub="(红标未成年)"
        tone="yellow"
        v-bind="data.current"
      />
    </div>
  </ScreenPanel>
</template>
