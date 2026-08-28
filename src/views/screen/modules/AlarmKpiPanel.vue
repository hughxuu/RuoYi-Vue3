<script setup>
import { Bell, ClipboardList, Phone, Share2 } from '@lucide/vue'
import KpiCard from '../components/KpiCard.vue'
import ScreenPanel from '../components/ScreenPanel.vue'

const props =defineProps({
  data: {
    type: Object,
    required: true
  }
})

console.log(props.data)
</script>

<template>
  <ScreenPanel title="接处警数据">
    <div class="grid h-full min-h-0 grid-cols-2 grid-rows-2 gap-2 p-2 max-sm:grid-cols-1 max-sm:grid-rows-4">
      <KpiCard :icon="ClipboardList" title="总数" tone="cyan" :value="props.data.totalAlarm" />
      <KpiCard :icon="Bell" title="自接警数据" tone="violet" :value="data.selfAlarm" />
      <KpiCard :icon="Share2" title="转警数据" tone="green" :value="data.transferAlarm" />
      <KpiCard :icon="Phone" title="110派警" tone="cyan" :value="data.policeDispatch" />
    </div>
  </ScreenPanel>
</template>
