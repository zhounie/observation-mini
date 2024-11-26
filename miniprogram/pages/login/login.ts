
Page({
  data: {
    userName: '',
    password: '',
    loading: false
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
      url: 'http://127.0.0.1:3000/login',
      method: 'POST',
      data: {
        userName: this.data.userName,
        password: this.data.password
      },
      success(res){
        if (res.data.code === 200) {
          wx.setStorageSync('userInfo', JSON.stringify(res.data.data))
          wx.navigateTo({
            url: '/pages/index/index'
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
  }
})