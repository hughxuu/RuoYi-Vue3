import request from '@/utils/request'

// 查询警务站工作统计列表
export function listWorkStatistics(query) {
  return request({
    url: '/bussiness/workStatistics/list',
    method: 'get',
    params: query
  })
}

// 查询警务站工作统计详情
export function getWorkStatistics(id) {
  return request({
    url: '/bussiness/workStatistics/' + id,
    method: 'get'
  })
}

// 新增警务站工作统计
export function addWorkStatistics(data) {
  return request({
    url: '/bussiness/workStatistics',
    method: 'post',
    data: data
  })
}

// 修改警务站工作统计
export function updateWorkStatistics(data) {
  return request({
    url: '/bussiness/workStatistics',
    method: 'put',
    data: data
  })
}

// 删除警务站工作统计
export function delWorkStatistics(ids) {
  return request({
    url: '/bussiness/workStatistics/' + ids,
    method: 'delete'
  })
}

// 导出
export function exportWorkStatistics(query) {
  return request({
    url: '/bussiness/workStatistics/export',
    method: 'get',
    params: query
  })
}

// Excel导入
export function importExcel(data) {
  return request({
    url: '/bussiness/workStatistics/importData',
    method: 'post',
    data: data
  })
}

// 下载导入模板
export function importTemplate() {
  return request({
    url: '/bussiness/workStatistics/importTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
