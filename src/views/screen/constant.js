export const PERIOD_OPTIONS = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' }
]

export const CHART_OPTIONS = [
  { label: '折线图', value: 'line' },
  { label: '柱状图', value: 'bar-line' }
]

export const UNIT_PARENT_IDS = {
  specialPolice: 101, // 特警支队单位
  cityBranch: 102 // 全市分局单位
}

export const createInitialQuery = () => ({
  startDate: '2026-05-01',
  endDate: '2026-05-31',
  unitName: '',
  period: 'day'
})

const emptyMetric = () => ({
  value: '-',
  rate: '-',
  up: true
})

export const createEmptyDashboard = () => ({
  updateTime: '-',
  alarmKpi: {
    total: emptyMetric(),
    selfAlarm: emptyMetric(),
    transfer: emptyMetric(),
    dispatch110: emptyMetric()
  },
  result: {
    fugitive: emptyMetric(),
    gang: emptyMetric(),
    current: emptyMetric()
  },
  pie: {
    red: 0,
    orange: 0,
    yellow: 0,
    blue: 0,
    gray: 0,
    dayChange: '-'
  },
  lineFugitive: {
    xAxis: [],
    caught: [],
    atLarge: [],
    newlyAdded: []
  },
  lineAlarm: {
    xAxis: [],
    self: [],
    transfer: [],
    dispatch: []
  },
  rank: {
    units: [],
    values: [],
    stats: {
      monthTotal: '-',
      lastMonth: '-',
      yoy: '-',
      wow: '-'
    }
  },
  juvenile: {
    xAxis: [],
    self: [],
    transfer: [],
    dispatch: [],
    stats: {
      monthTotal: '-',
      lastMonth: '-',
      yoy: '-',
      wow: '-'
    }
  },
  specialPoliceUnits: [],
  cityBranchUnits: []
})

export const MINOR_LEVELS = [
  {
    key: 'red',
    label: '红标',
    colorClass: 'bg-screen-pie-red'
  },
  {
    key: 'orange',
    label: '橙标',
    colorClass: 'bg-screen-pie-orange'
  },
  {
    key: 'yellow',
    label: '黄标',
    colorClass: 'bg-screen-pie-yellow'
  },
  {
    key: 'blue',
    label: '蓝标',
    colorClass: 'bg-screen-pie-blue'
  },
  {
    key: 'gray',
    label: '黑标',
    colorClass: 'bg-screen-pie-gray'
  }
]
