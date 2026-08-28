export const PERIOD_OPTIONS = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' }
]

export const UNIT_PARENT_IDS = {
  specialPolice: 101, // 特警支队单位
  cityBranch: 102 // 全市分局单位
}

const getCurrentMonthRange = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthText = String(month + 1).padStart(2, '0')
  const lastDay = String(new Date(year, month + 1, 0).getDate()).padStart(2, '0')

  return {
    startDate: `${year}-${monthText}-01`,
    endDate: `${year}-${monthText}-${lastDay}`
  }
}

export const createInitialQuery = () => ({
  ...getCurrentMonthRange(),
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
    colorClass: 'bg-category-red'
  },
  {
    key: 'orange',
    label: '橙标',
    colorClass: 'bg-category-orange'
  },
  {
    key: 'yellow',
    label: '黄标',
    colorClass: 'bg-category-yellow'
  },
  {
    key: 'blue',
    label: '蓝标',
    colorClass: 'bg-category-blue'
  },
  {
    key: 'gray',
    label: '黑标',
    colorClass: 'bg-category-gray'
  }
]
