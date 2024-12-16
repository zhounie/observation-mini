import { request } from '../../utils/request'
Page({
  data: {
    list: []
  },
  onLoad() {
    this.handleGetList()
  },
  handleGetList() {
    request('/alarmRecord', 'GET', {}).then(res => {
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
  }
})