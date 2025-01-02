import { IP } from '../config/env'

export const request = (path: string, method: 'POST' | 'GET' | 'DELETE' | 'PUT', params = {}) => {
  const userInfo = wx.getStorageSync('userInfo')
  const cookies = wx.getStorageSync('cookies') || ''
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${IP}${path}`,
      method: method,
      header: {
        Authorization: `Basic ${userInfo.token}`,
        Cookie: cookies
      },
      data: params,
      success(res){
        if (res.data.code === 401) {
          wx.reLaunch({
            url: '/pages/login/login'
          })
          return
        }
        resolve(res.data)
      },
      fail(err) {
        console.log(err);
      }
    })
  })
}