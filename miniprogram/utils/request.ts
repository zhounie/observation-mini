import { IP } from '../config/env'

export const request = (path: string, method: 'POST' | 'GET' | 'DELETE' | 'PUT', params = {}) => {
  const userInfo = wx.getStorageSync('userInfo')
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${IP}${path}`,
      method: method,
      header: {
        Authorization: `Basic ${userInfo.token}`
      },
      data: params,
      success(res){
        resolve(res.data)
      },
      fail(err) {
        console.log(err);
      }
    })
  })
}