const DEFAULT_START_DATE = '2026-05-01'
const DEFAULT_END_DATE = '2026-05-31'

const UNITS = ['单位01', '单位02', '单位03', '单位04', '单位05', '单位06', '单位07', '单位08', '单位09', '单位10']

const createDateLabels = (startDate = DEFAULT_START_DATE, endDate = DEFAULT_END_DATE, period = 'day') => {
	const start = new Date(`${startDate}T00:00:00`)
	const end = new Date(`${endDate}T00:00:00`)
	const labels = []

	while (start <= end) {
		labels.push(`${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`)
		start.setDate(
			start.getDate() +
				(period === 'month' ? 7
				: period === 'week' ? 2
				: 1)
		)
	}

	return labels
}

const getQuery = params => ({
	startDate: params?.startDate || DEFAULT_START_DATE,
	endDate: params?.endDate || DEFAULT_END_DATE,
	period: params?.period || 'day',
	unitName: params?.unitName || ''
})

const getAlarmKpi = params => ({
	updateTime: '2026-05-31 22:00:26',
	total: { value: '2,359', rate: '↑8%', up: true },
	selfAlarm: { value: '1,487', rate: '↑6%', up: true },
	transfer: { value: '872', rate: '↓4%', up: false },
	dispatch110: { value: '1,102', rate: '↑9%', up: true },
	query: getQuery(params)
})

const getResultKpi = params => ({
	fugitive: { value: '616', rate: '↑12%', up: true },
	gang: { value: '1,037', rate: '↑7%', up: true },
	current: { value: '38', rate: '↓10%', up: false },
	query: getQuery(params)
})

const getMinorPie = params => ({ red: 100, orange: 140, yellow: 180, blue: 220, gray: 85, dayChange: '↓ 5%', query: getQuery(params) })

const getFugitiveTrend = params => {
	const query = getQuery(params)
	const xAxis = createDateLabels(query.startDate, query.endDate, query.period)

	return {
		xAxis,
		caught: [540, 650, 590, 620, 700, 590, 650, 820, 980, 900, 940, 820, 870, 940, 980, 930, 920, 1100, 1280, 1200, 1240, 1150, 1220, 1380, 1290, 1380, 1480, 1400, 1420, 1350, 1280].slice(0, xAxis.length),
		atLarge: [320, 410, 390, 400, 460, 390, 430, 500, 570, 500, 440, 530, 510, 540, 610, 580, 560, 620, 710, 650, 620, 680, 760, 820, 780, 700, 760, 850, 720, 690, 860].slice(0, xAxis.length),
		newlyAdded: [70, 150, 130, 120, 180, 160, 150, 250, 210, 150, 130, 230, 180, 140, 120, 210, 160, 190, 280, 180, 150, 130, 140, 220, 120, 160, 180, 270, 190, 140, 180].slice(0, xAxis.length),
		query
	}
}

const getAlarmTrend = params => {
	const query = getQuery(params)
	const xAxis = createDateLabels(query.startDate, query.endDate, query.period)
	return {
		xAxis,
		self: [900, 1050, 970, 930, 990, 870, 820, 980, 1100, 980, 1040, 880, 950, 970, 1100, 1020, 1080, 1160, 1280, 1120, 1100, 1000, 1140, 1300, 1180, 1120, 990, 1050, 1100, 1170, 1200].slice(0, xAxis.length),
		transfer: [520, 580, 560, 620, 690, 520, 500, 580, 620, 650, 590, 520, 530, 600, 680, 700, 650, 560, 600, 720, 780, 700, 650, 600, 720, 680, 610, 580, 660, 700, 590].slice(0, xAxis.length),
		dispatch: [1080, 1200, 1320, 1320, 1150, 1050, 1300, 1500, 1350, 1200, 1350, 1500, 1650, 1500, 1380, 1500, 1700, 1550, 1400, 1500, 1650, 1800, 1650, 1500, 1400, 1450, 1550, 1450, 1380, 1460, 1520].slice(0, xAxis.length),
		query
	}
}

const getUnitRank = params => {
	const query = getQuery(params)
	return {
		units: UNITS,
		values: [126, 98, 75, 52, 38, 26, 18, 12, 9, 6],
		trend: {
			xAxis: createDateLabels(query.startDate, query.endDate, query.period),
			robbery: [140, 160, 180, 175, 210, 230, 250, 300, 330, 320, 350, 330, 360, 390, 370, 400, 380, 420, 390, 410, 380, 420, 400, 430, 390, 370, 400, 380, 430, 450, 480],
			theft: [380, 410, 460, 470, 500, 520, 520, 620, 720, 780, 690, 610, 640, 680, 650, 670, 620, 680, 650, 690, 640, 700, 730, 740, 720, 700, 740, 760, 720, 750, 800],
			pickpocket: [70, 80, 75, 85, 90, 86, 95, 90, 100, 105, 100, 110, 105, 112, 108, 115, 110, 120, 112, 118, 115, 124, 120, 126, 122, 118, 130, 125, 132, 128, 140]
		},
		stats: { monthTotal: '1,246 起', lastMonth: '↑12%', yoy: '↓8%', wow: '↑6%' },
		query
	}
}

const getJuvenileTrend = params => {
	const query = getQuery(params)
	const xAxis = createDateLabels(query.startDate, query.endDate, query.period).filter((_, index) => index % 2 === 0)
	return {
		xAxis,
		self: [115, 175, 145, 210, 190, 145, 240, 210, 160, 150, 190, 230, 250, 200, 180, 220].slice(0, xAxis.length),
		transfer: [78, 120, 95, 140, 125, 105, 160, 130, 120, 100, 145, 155, 180, 125, 130, 145].slice(0, xAxis.length),
		dispatch: [45, 90, 60, 72, 85, 180, 100, 65, 80, 90, 110, 100, 125, 95, 140, 105].slice(0, xAxis.length),
		stats: { monthTotal: '426 人', lastMonth: '↓9%', yoy: '↓5%', wow: '↑3%' },
		query
	}
}

const getUnitOptions = () => UNITS.map(value => ({ label: value, value }))

export const policeDashboardMockHandlers = {
	getAlarmKpi,
	getResultKpi,
	getMinorPie,
	getFugitiveTrend,
	getAlarmTrend,
	getUnitRank,
	getJuvenileTrend,
	getUnitOptions
}
