import { policeDashboardMockHandlers } from '../../src/mock/policeDashboard.js'

const routes = {
  '/getAlarmKpi': 'getAlarmKpi',
  '/getResultKpi': 'getResultKpi',
  '/getMinorPie': 'getMinorPie',
  '/getFugitiveTrend': 'getFugitiveTrend',
  '/getAlarmTrend': 'getAlarmTrend',
  '/getUnitRank': 'getUnitRank',
  '/getJuvenileTrend': 'getJuvenileTrend',
  '/getUnitOptions': 'getUnitOptions'
}

const readBody = req =>
  new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch {
        resolve({})
      }
    })
  })

export default function createPoliceDashboardMock() {
  return {
    name: 'police-dashboard-mock',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const requestUrl = new URL(req.url || '/', 'http://localhost')
        const prefix = '/dev-api/policeScreen'
        const handlerName = requestUrl.pathname.startsWith(prefix)
          ? routes[requestUrl.pathname.slice(prefix.length)]
          : undefined

        if (req.method !== 'POST' || !handlerName) {
          next()
          return
        }

        const params = await readBody(req)
        const data = policeDashboardMockHandlers[handlerName](params)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ code: 200, msg: '操作成功', data }))
      })
    }
  }
}
