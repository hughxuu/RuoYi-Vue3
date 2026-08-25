<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section class="screen-panel">
    <header class="screen-panel-header">
      <span class="mr-2 h-5 w-1 shrink-0 bg-screen-cyan shadow-[0_0_0.5rem_rgba(32,181,241,0.7)]" />
      <h2 class="m-0 shrink-0 whitespace-nowrap text-base font-bold tracking-wide text-white">
        {{ title }}
      </h2>
      <small v-if="unit" class="ml-1 shrink-0 whitespace-nowrap text-xs font-normal text-slate-300">
        {{ unit }}
      </small>
    </header>

    <div class="screen-panel-body">
      <div class="screen-panel-actions">
        <slot name="actions" />
      </div>
      <slot />
    </div>
  </section>
</template>
