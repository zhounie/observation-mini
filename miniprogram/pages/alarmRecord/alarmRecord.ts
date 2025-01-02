import { request } from '../../utils/request'
Page({
  data: {
    list: [],
    type: '1'
  },
  onLoad(options) {
    this.setData({
      type: options.type
    })
  },
  onShow() {
    this.handleGetList()
  },
  handleGetList() {
    const params = {
      dateType: 0
    }
    if (this.data.type === '0') {
      params.status = 0
    }
    request('/alarmRecord', 'GET', params).then(res => {
      if (res.code === 200) {
        const Status = ['未处理', '误报', '设备调试', '真实报警']
        this.setData({
          list: res.data.map(item => {
            return {
              ...item,
              typeName: item.type === 1 ? '有害气体浓度超标' : '温度过高',
              statusName: Status[item.status]
            }
          })
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  onGoDetail(e) {
    wx.navigateTo({
      url: `/pages/alarmDetail/alarmDetail?id=${e.currentTarget.dataset.item.id}`
    })
  },
  onGoHandling(e) {
    wx.navigateTo({
      url: `/pages/handlingAlarm/handlingAlarm?id=${e.currentTarget.dataset.item.id}`
    })
  }
})