import mqttInit from '../../utils/sub'
import { isLogin } from '../../utils/util'
import { request } from '../../utils/request'
Page({
  data: {
    temp: 0,
    humi: 0,
    lux: 0,
    mq2: 0,
    uuid: undefined,
    isAlarm: false
  },
  onLoad(options) {
    this.setData({
      uuid: options.uuid
    })
    mqttInit({
      callback: this.message
    })
  },
  onShow() {
    isLogin()
    this.handleGetAlarmList()
  },
  message(topic, data) {
    if (topic === '/device/set' && data.uuid == this.data.uuid) {
      this.setData({
        temp: data.temp,
        humi: data.humi,
        lux: data.lux,
        mq2: data.mq2
      })
    }
  },
  handleGetAlarmList() {
    request('/alarmRecord', 'GET', {
      status: 0,
      uuid: this.data.uuid
    }).then(res => {
      if (res.code === 200) {
        this.setData({
          isAlarm: !!res.data.length
        })
      }
    })
  }
})