import { IP } from '../../config/env'
import { isLogin } from '../../utils/util'
import { request } from '../../utils/request'
Page({

  data: {
    deviceList: [],
    searchValue: ''
  },

  onShow() {
    isLogin()
    this.handleGetList()
  },

  onInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  handleGetList() {
    request('/device', 'GET', {
      text: this.data.searchValue,
      status: 1
    }).then(res => {
      if (res.code === 200) {
        this.setData({
          deviceList: res.data
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },

  onSearch(e) {
    this.handleGetList()
  },
  onGo(e) {
    if (e.currentTarget.dataset.item.isOnline) {
      wx.navigateTo({
        url: `/pages/index/index?uuid=${e.currentTarget.dataset.item.uuid}&id=${e.currentTarget.dataset.item.id}`
      })
    } else {
      wx.showToast({
        title: '设备已离线',
        icon: 'none'
      })
    }
  }
})