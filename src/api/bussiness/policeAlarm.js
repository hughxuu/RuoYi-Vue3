// src/api/bussiness/policeAlarm.js
import request from '@/utils/request'

/**
 * 接处警台账列表查询
 * @param {Object} queryParams
 */
export function listPoliceAlarm(queryParams) {
  return request({
    url: '/bussiness/policeAlarm/list',
    method: 'get',
    params: queryParams
  })
}

/**
 * 根据id获取单条详情
 * @param {Number|Long} id
 */
export function getPoliceAlarm(id) {
  return request({
    url: '/bussiness/policeAlarm/' + id,
    method: 'get'
  })
}

/**
 * 新增接处警台账
 * @param {Object} data
 */
export function addPoliceAlarm(data) {
  return request({
    url: '/bussiness/policeAlarm',
    method: 'post',
    data: data
  })
}

/**
 * 修改接处警台账
 * @param {Object} data
 */
export function updatePoliceAlarm(data) {
  return request({
    url: '/bussiness/policeAlarm',
    method: 'put',
    data: data
  })
}

/**
 * 删除（支持单条/批量）
 * @param {Long | Array<Long>} id
 */
export function delPoliceAlarm(id) {
  return request({
    url: '/bussiness/policeAlarm/' + id,
    method: 'delete'
  })
}

/**
 * 导出
 * @param {Object} params
 */
export function exportPoliceAlarm(params) {
  return request({
    url: '/bussiness/policeAlarm/export',
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}

/**
 * 下载导入模板
 */
export function importTemplatePoliceAlarm() {
  return request({
    url: '/bussiness/policeAlarm/importTemplate',
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * excel导入接口
 * @param {FormData} data
 */
export function importPoliceAlarm(data) {
  return request({
    url: '/bussiness/policeAlarm/importData',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
