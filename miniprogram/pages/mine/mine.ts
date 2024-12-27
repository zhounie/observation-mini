import { IP } from '../../config/env'
import { isLogin } from '../../utils/util'
import dayjs from 'dayjs'
import { request } from '../../utils/request'
Page({

  data: {
    userInfo: {},
    count: 0
  },

  onShow() {
    isLogin()
    this.handleGetCount()
  },
  onLoad() {
    this.setData({
      userInfo: wx.getStorageSync("userInfo")
    })
  },

  onLogout() {
    wx.clearStorageSync()
    wx.reLaunch({
      url:'/pages/login/login'
    })
  },

  handleGetCount() {
    request('/alarmRecord', 'GET', {
      dateType: 0
    }).then(res => {
      if (res.code === 200) {
        this.setData({
          count: res.data.length
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },

  onGoAlarmRecord() {
    wx.navigateTo({
      url: '/pages/alarmRecord/alarmRecord'
    })
  }
})