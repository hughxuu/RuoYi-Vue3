<script setup>
import { Bell, ClipboardList, Phone, Share2 } from '@lucide/vue'
import KpiCard from '../components/KpiCard.vue'
import ScreenPanel from '../components/ScreenPanel.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <ScreenPanel title="接处警数据">
    <div class="grid h-full min-h-0 grid-cols-2 grid-rows-2 gap-2 p-2 max-sm:grid-cols-1 max-sm:grid-rows-4">
      <KpiCard :icon="ClipboardList" title="总数" tone="cyan" v-bind="data.total" />
      <KpiCard :icon="Bell" title="自接警数据" tone="violet" v-bind="data.selfAlarm" />
      <KpiCard :icon="Share2" title="转警数据" tone="green" v-bind="data.transfer" />
      <KpiCard :icon="Phone" title="110派警" tone="cyan" v-bind="data.dispatch110" />
    </div>
  </ScreenPanel>
</template>
