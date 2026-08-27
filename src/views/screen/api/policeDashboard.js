import request from '@/utils/request'

export function getAlarmKpi(params) {
  return request({
    url: '/policeScreen/getAlarmKpi',
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getResultKpi(params) {
  return request({
    url: '/policeScreen/getResultKpi',
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getMinorPie(params) {
  return request({
    url: '/policeScreen/getMinorPie',
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getFugitiveTrend(params) {
  return request({
    url: '/policeScreen/getFugitiveTrend',
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getAlarmTrend(params) {
  return request({
    url: '/policeScreen/getAlarmTrend',
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getUnitRank(params) {
  return request({
    url: '/policeScreen/getUnitRank',
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getJuvenileTrend(params) {
  return request({
    url: '/policeScreen/getJuvenileTrend',
    method: 'post',
    data: params
  }).then(response => response.data)
}

export function getUnitOptions(params) {
  return request({
    url: '/system/dept/listByParentId',
    method: 'get',
    params
  }).then(response => response.data)
}
