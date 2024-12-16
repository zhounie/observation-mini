import { request } from '../../utils/request'
Page({

  data: {
    alarmInfo: {}
  },

  onLoad() {
    request('/alarmRecord', 'GET', {}).then(res => {
      if (res.code === 200) {
        // this.setData({
        //   list: res.data.map(item => {
        //     return {
        //       ...item,
        //       typeName: item.type === 1 ? '有害气体浓度超标' : '温度过高',
        //     }
        //   })
        // })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },

})