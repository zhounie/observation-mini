import { IP } from '../../config/env'
import { isLogin } from '../../utils/util'
import dayjs from 'dayjs'
Page({

  data: {
    userInfo: {},
    count: 0
  },

  onShow() {
    isLogin()
  },
  onLoad() {
    this.handleGetCount()
    this.setData({
      userInfo: JSON.parse(wx.getStorageSync("userInfo") || '{}')
    })
  },

  onLogout() {
    wx.clearStorageSync()
    wx.reLaunch({
      url:'/pages/login/login'
    })
  },

  handleGetCount() {
    wx.request({
      url: `${IP}/alarmCount`,
      method: 'POST',
      data: {
        date: dayjs().format('YYYY-MM-DD')
      },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            count: res.data.data.length
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail(err) {
        console.log(err);
      },
      complete: () => {
        this.setData({
          loading: false
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