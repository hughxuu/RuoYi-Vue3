import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'

export function useECharts(elementRef) {
  const chart = shallowRef(null)

  const ensureChart = () => {
    if (!elementRef.value) {
      return null
    }

    chart.value ||= echarts.init(elementRef.value)
    return chart.value
  }

  const setOption = (option) => {
    ensureChart()?.setOption(option, true)
  }

  const resize = () => {
    ensureChart()?.resize()
  }

  useResizeObserver(elementRef, resize)

  onMounted(resize)
  onBeforeUnmount(() => ensureChart()?.dispose())

  return {
    setOption,
    resize
  }
}
