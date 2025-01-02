import { IP } from '../../config/env'
Page({
  data: {
    userName: '',
    password: '',
    loading: false,
    showPassword: false
  },
  onShow() {
    wx.hideHomeButton()
  },
  onLoad() {

  },
  onChangePhone(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  onChangePassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  onLogin() {
    if (!this.data.userName) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      })
      return
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    this.setData({
      loading: true
    })
    wx.request({
      url: `${IP}/login`,
      method: 'POST',
      data: {
        userName: this.data.userName,
        password: this.data.password
      },
      success(res){
        if (res.data.code === 200) {
          wx.setStorageSync('userInfo', res.data.data)
          wx.setStorageSync('cookies', res.cookies.join(';'))
          wx.switchTab({
            url: '/pages/home/home',
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

  onShowPassword() {
    this.setData({
      showPassword: !this.data.showPassword
    })
  },
  onClearUserName() {
    this.setData({
      userName: ''
    })
  },
  onClearPassword() {
    this.setData({
      password: ''
    })
  }
})