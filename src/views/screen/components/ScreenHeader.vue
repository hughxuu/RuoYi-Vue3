<script setup>
import { Download, Maximize, Minimize } from '@lucide/vue'

defineProps({
  updateTime: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullscreen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['fullscreen', 'export'])
</script>

<template>
  <header class="relative flex min-h-screen-header items-center justify-center border-b border-screen-border/50 after:absolute after:bottom-[-2px] after:left-1/4 after:h-0.5 after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-screen-cyan after:to-transparent after:shadow-screen-header after:content-empty max-lg:justify-start max-md:flex-col max-md:items-start max-md:gap-2 max-md:py-3">
    <div class="flex items-center gap-4 max-lg:ml-4 max-lg:text-left max-md:ml-0">
      <div class="hidden items-center gap-2 lg:flex">
        <i class="h-px w-28 bg-gradient-to-r from-transparent to-screen-cyan/80" />
        <i class="h-3 w-12 skew-x-[35deg] border-y border-screen-cyan/80 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_0.25rem,rgba(32,181,241,0.8)_0.25rem,rgba(32,181,241,0.8)_0.5rem)]" />
      </div>
      <div class="text-center max-lg:text-left">
        <h1 class="m-0 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-[0.25rem] text-white drop-shadow-[0_0_12px_rgba(81,183,244,0.4)]">
          街面群防治效
        </h1>
        <p class="mb-0 mt-1 text-xs tracking-[0.25rem] text-[#78a8c8] max-md:tracking-[0.25rem]">
          POLICE STATION DAILY WORK DATA CENTER
        </p>
      </div>
      <div class="hidden items-center gap-2 lg:flex">
        <i class="h-3 w-12 -skew-x-[35deg] border-y border-screen-cyan/80 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_0.25rem,rgba(32,181,241,0.8)_0.25rem,rgba(32,181,241,0.8)_0.5rem)]" />
        <i class="h-px w-28 bg-gradient-to-l from-transparent to-screen-cyan/80" />
      </div>
    </div>
    <div class="absolute right-4 flex items-center gap-4 text-xs text-screen-muted max-lg:static max-lg:ml-auto max-lg:flex-wrap max-lg:justify-end max-md:ml-0">
      <span class="inline-flex items-center gap-2">
        <i
          :class="{ 'animate-screen-pulse': loading }"
          class="h-2 w-2 rounded-full bg-screen-lime shadow-[0_0_0.5rem_rgba(141,189,83,0.7)]"
        />
        数据更新时间：{{ updateTime }}
      </span>

      <el-button
        :aria-label="fullscreen ? '退出全屏' : '全屏'"
        :title="fullscreen ? '退出全屏' : '全屏'"
        class="screen-icon-button"
        @click="$emit('fullscreen')"
      >
        <component :is="fullscreen ? Minimize : Maximize" :size="16" :stroke-width="1.8" />
      </el-button>

      <el-button
        aria-label="导出数据"
        title="导出数据"
        class="screen-icon-button"
        @click="$emit('export')"
      >
        <Download :size="16" :stroke-width="1.8" />
      </el-button>
    </div>
  </header>
</template>
