<script setup>
import { RefreshCw, Search } from '@lucide/vue'
import { computed } from 'vue'
import { PERIOD_OPTIONS } from '../constant'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  unitOptions: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'submit', 'reset'])

const dateRange = computed({
  get: () => [props.modelValue.startDate, props.modelValue.endDate],
  set: (value) => {
    if (!value?.length) {
      return
    }
    emit('update:modelValue', {
      ...props.modelValue,
      startDate: value[0],
      endDate: value[1]
    })
  }
})

const setField = (key, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script>

<template>
  <section
    class="flex min-h-screen-toolbar items-center gap-3 px-4 py-2 text-screen-text max-lg:flex-wrap max-md:h-auto"
  >
    <div class="flex min-w-0 flex-1 flex-wrap items-center gap-3 max-md:w-full">
      <span class="whitespace-nowrap text-sm text-screen-muted">日期范围</span>
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        popper-class="screen-popper"
        class="w-96 flex-none !bg-screen-input !shadow-none !ring-1 !ring-screen-border-soft max-lg:w-80 max-md:w-full [&_.el-range-input]:!bg-transparent [&_.el-range-input]:!text-screen-text [&_.el-range-separator]:!text-screen-muted [&_.el-input__icon]:!text-screen-muted"
      />
      <span class="whitespace-nowrap text-sm text-screen-muted">基层单位</span>
      <el-select
        :model-value="modelValue.unitName"
        popper-class="screen-popper"
        class="w-40 max-md:w-full [&_.el-select\_\_wrapper]:!bg-screen-input [&_.el-select\_\_wrapper]:!shadow-none [&_.el-select\_\_wrapper]:!ring-1 [&_.el-select\_\_wrapper]:!ring-screen-border-soft [&_.el-select\_\_selected-item]:!text-screen-text [&_.el-select\_\_caret]:!text-screen-muted"
        placeholder="全部单位"
        @update:model-value="setField('unitName', $event)"
      >
        <el-option label="全部单位" value="" />
        <el-option
          v-for="unit in unitOptions"
          :key="unit.deptId"
          :label="unit.deptName"
          :value="unit.deptId"
        />
      </el-select>
      <el-segmented
        :model-value="modelValue.period"
        :options="PERIOD_OPTIONS"
        aria-label="统计周期"
        class="screen-segmented screen-segmented-period w-40"
        size="default"
        @change="setField('period', $event)"
      />
    </div>
    <div class="ml-auto flex shrink-0 max-md:ml-0 max-md:w-full">
      <el-button
        class="screen-action-button screen-action-button-primary"
        :loading="loading"
        :disabled="loading"
        @click="emit('submit')"
      >
        <Search
          v-if="!loading"
          class="mr-1 inline-block align-middle"
          :size="16"
          :stroke-width="1.8"
        />
        {{ loading ? "加载中" : "查询" }}
      </el-button>
      <el-button class="screen-action-button" :disabled="loading" @click="emit('reset')">
        <RefreshCw class="mr-1 inline-block align-middle" :size="16" :stroke-width="1.8" />
        重置
      </el-button>
    </div>
  </section>
</template>
