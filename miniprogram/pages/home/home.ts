import { IP } from '../../config/env'
import { isLogin } from '../../utils/util'
Page({

  data: {
    deviceList: [],
    searchValue: ''
  },

  onShow() {
    isLogin()
  },

  onLoad() {
    this.handleGetList()
  },

  onInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  handleGetList() {
    wx.request({
      url: `${IP}/device`,
      method: 'GET',
      data: {
        deviceName: this.data.searchValue,
        status: 1
      },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            deviceList: res.data.data
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

  onSearch(e) {
    this.handleGetList()
  },
  onGo() {
    wx.navigateTo({
      url: "/pages/index/index"
    })
  }
})