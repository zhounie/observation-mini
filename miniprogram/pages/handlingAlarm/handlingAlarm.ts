import { request } from '../../utils/request'
Page({

  data: {
    alarmInfo: {},
    show: false,
    type: undefined,
    typeName: ''
  },

  onLoad(options) {
    request('/alarmDetail', 'GET', {
      id: options.id
    }).then(res => {
      if (res.code === 200) {
        const data = res.data
        data.typeName = data.type === 1 ? '有害气体浓度超标' : '温度过高',
        this.setData({
          alarmInfo: data
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  onConfirm(e) {
    console.log(e);
    const TypeName = ['误报', '设备调试', '真实报警']
    this.setData({
      show: true,
      type: e.currentTarget.dataset.type,
      typeName: TypeName[e.currentTarget.dataset.type]
    })
  },
  onConfirmStatus() {
    request('/alarmStatus', 'PUT', {
      id: this.data.alarmInfo.id,
      status: this.data.type
    }).then(res => {
      if (res.code === 200) {
        wx.navigateBack()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
})