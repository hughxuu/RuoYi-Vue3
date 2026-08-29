import request from '@/utils/request'

// 查询未成年人违法犯罪统计列表
export function listPoliceMinorCrime(query) {
  return request({
    url: '/bussiness/minorCrime/list',
    method: 'get',
    params: query
  })
}

// 查询未成年人违法犯罪统计详细
export function getPoliceMinorCrime(id) {
  return request({
    url: '/bussiness/minorCrime/' + id,
    method: 'get'
  })
}

// 新增未成年人违法犯罪统计
export function addPoliceMinorCrime(data) {
  return request({
    url: '/bussiness/minorCrime',
    method: 'post',
    data: data
  })
}

// 修改未成年人违法犯罪统计
export function updatePoliceMinorCrime(data) {
  return request({
    url: '/bussiness/minorCrime',
    method: 'put',
    data: data
  })
}

// 删除未成年人违法犯罪统计
export function delPoliceMinorCrime(id) {
  return request({
    url: '/bussiness/minorCrime/' + id,
    method: 'delete'
  })
}
