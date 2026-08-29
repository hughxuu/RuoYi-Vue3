import request from '@/utils/request'

// 查询两抢一盗发案数统计列表
export function listPoliceTwoRob(query) {
  return request({
    url: '/bussiness/twoRob/list',
    method: 'get',
    params: query
  })
}

// 查询两抢一盗发案数统计详细
export function getPoliceTwoRob(id) {
  return request({
    url: '/bussiness/twoRob/' + id,
    method: 'get'
  })
}

// 新增两抢一盗发案数统计
export function addPoliceTwoRob(data) {
  return request({
    url: '/bussiness/twoRob',
    method: 'post',
    data: data
  })
}

// 修改两抢一盗发案数统计
export function updatePoliceTwoRob(data) {
  return request({
    url: '/bussiness/twoRob',
    method: 'put',
    data: data
  })
}

// 删除两抢一盗发案数统计
export function delPoliceTwoRob(id) {
  return request({
    url: '/bussiness/twoRob/' + id,
    method: 'delete'
  })
}
