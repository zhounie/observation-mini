import { request } from '../../utils/request'
Page({

  data: {
    alarmInfo: {},
    id: undefined
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
  }, 

  onShow() {
    request('/alarmDetail', 'GET', {
      id: this.data.id
    }).then(res => {
      if (res.code === 200) {
        const Status = ['未处理', '误报', '设备调试', '真实报警']
        const data = res.data
        data.typeName = data.type === 1 ? '有害气体浓度超标' : '温度过高',
        data.statusName = Status[data.status]
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

  onGoHandling() {
    wx.navigateTo({
      url: `/pages/handlingAlarm/handlingAlarm?id=${this.data.alarmInfo.id}`
    })
  }
})