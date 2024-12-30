import mqttInit from '../../utils/sub'
import { isLogin } from '../../utils/util'
Page({
  data: {
    temp: 0,
    humi: 0,
    lux: 0,
    mq2: 0,
    uuid: undefined
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
  }
})