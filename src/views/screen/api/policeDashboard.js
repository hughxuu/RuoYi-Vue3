import request from '@/utils/request'

const screenUrl = endpoint => `/policeScreen/${endpoint}`

export function getAlarmKpi(params) {
  return request({
    url: screenUrl('getAlarmKpi'),
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getResultKpi(params) {
  return request({
    url: screenUrl('getResultKpi'),
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getMinorPie(params) {
  return request({
    url: screenUrl('getMinorPie'),
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getFugitiveTrend(params) {
  return request({
    url: screenUrl('getFugitiveTrend'),
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getAlarmTrend(params) {
  return request({
    url: screenUrl('getAlarmTrend'),
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getUnitRank(params) {
  return request({
    url: screenUrl('getUnitRank'),
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getJuvenileTrend(params) {
  return request({
    url: screenUrl('getJuvenileTrend'),
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getUnitOptions(params) {
  return request({
    url: screenUrl('getUnitOptions'),
    method: 'post',
    data: params
  }).then(response => response.data)
}

export async function getDashboardData(params) {
  const [alarmKpi, result, pie, lineFugitive, lineAlarm, rank, juvenile, units] = await Promise.all(
    [
      getAlarmKpi(params),
      getResultKpi(params),
      getMinorPie(params),
      getFugitiveTrend(params),
      getAlarmTrend(params),
      getUnitRank(params),
      getJuvenileTrend(params),
      getUnitOptions(params)
    ]
  )

  return {
    updateTime: alarmKpi.updateTime,
    alarmKpi,
    result,
    pie,
    lineFugitive,
    lineAlarm,
    rank,
    juvenile,
    units
  }
}
